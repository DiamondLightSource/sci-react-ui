import {
  apcaLc,
  composite,
  contrast,
  CVD_TYPES,
  deltaE,
  hexToOklch,
  hueGap,
  identityDistance,
  lstar,
  minAlphaForContrast,
} from "./colour.mjs";
import { OPACITY, SLOTS, THRESHOLDS as T } from "../palette.mjs";
import { MARKERS } from "../markers.mjs";
import {
  CHART_SURFACES,
  onSurfaceFor,
  readDsTokens,
  reservedFor,
  surfacesFor,
} from "./tokens.mjs";

export const MODES = ["light", "dark"];

// Pairs closer than this in L* look alike in greyscale and print.
export const GREY_CLOSE = 5;

const LABEL_FILLS = Object.entries(OPACITY)
  .filter(([k]) => k.startsWith("label"))
  .map(([, v]) => v);

const min = (xs) => Math.min(...xs);
// Lowest fill opacity reaching the contrast gate on every chart surface; null if none does.
const minAlphaOnChartSurfaces = (hex, surfaces) => {
  const alphas = CHART_SURFACES.map((k) =>
    minAlphaForContrast(hex, surfaces[k]),
  );
  return alphas.includes(null) ? null : Math.max(...alphas);
};
const mapValues = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));

// Values stay unrounded here so every gate compares the real figure; presenters round.
const measureMode = (tokens, mode) => {
  const surfaces = surfacesFor(tokens, mode);
  const reserved = reservedFor(tokens, mode);
  const hexes = SLOTS.map((s) => s[mode]);
  const onSurface = onSurfaceFor(tokens, mode);

  const slots = hexes.map((hex, i) => {
    const lch = hexToOklch(hex);
    const onSurfaces = mapValues(surfaces, (bg) => contrast(hex, bg));
    const labelText = (keys) =>
      min(
        keys.flatMap((k) =>
          LABEL_FILLS.map((o) =>
            contrast(onSurface, composite(hex, surfaces[k], o)),
          ),
        ),
      );
    const nearest = reserved
      .map((r) => {
        const o = hexToOklch(r.hex);
        return {
          token: r.name,
          deltaE: deltaE(hex, r.hex),
          hueGap:
            lch.C > T.neutralChroma && o.C > T.neutralChroma
              ? hueGap(lch.h, o.h)
              : null,
        };
      })
      .sort((a, b) => a.deltaE - b.deltaE);
    const fillContrast = (opacity) =>
      min(
        Object.values(surfaces).map((bg) =>
          contrast(composite(hex, bg, opacity), bg),
        ),
      );
    return {
      slot: i + 1,
      oklch: lch,
      lstar: lstar(hex),
      contrast: onSurfaces,
      dataFillContrast: min(
        CHART_SURFACES.map((k) =>
          contrast(composite(hex, surfaces[k], OPACITY.data), surfaces[k]),
        ),
      ),
      minAlpha: minAlphaOnChartSurfaces(hex, surfaces),
      labelTextContrast: labelText(CHART_SURFACES),
      labelTextContrastAll: labelText(Object.keys(surfaces)),
      fillContrast: {
        area: fillContrast(OPACITY.area),
        band: fillContrast(OPACITY.band),
      },
      readsAsText: Object.entries(surfaces).every(
        ([k, bg]) =>
          onSurfaces[k] >= T.textContrast &&
          Math.abs(apcaLc(hex, bg)) >= T.textLc,
      ),
      nearestReserved: nearest[0],
      minHueGap: min(nearest.map((n) => n.hueGap ?? 360)),
    };
  });

  const pairs = [];
  for (let i = 0; i < hexes.length; i++) {
    for (let j = i + 1; j < hexes.length; j++) {
      pairs.push({
        a: i + 1,
        b: j + 1,
        normal: deltaE(hexes[i], hexes[j]),
        ...Object.fromEntries(
          CVD_TYPES.map((v) => [v, deltaE(hexes[i], hexes[j], v)]),
        ),
      });
    }
  }

  const worst = (list) =>
    Object.fromEntries(
      ["normal", ...CVD_TYPES].map((v) => {
        const p = list.reduce((m, q) => (q[v] < m[v] ? q : m));
        return [v, { value: p[v], pair: [p.a, p.b] }];
      }),
    );
  const prefix = Array.from({ length: hexes.length - 1 }, (_, k) => {
    const n = k + 2;
    return {
      slots: n,
      ...mapValues(worst(pairs.filter((p) => p.b <= n)), (w) => w.value),
    };
  });

  const greyClose = pairs
    .map((p) => ({
      a: p.a,
      b: p.b,
      dL: Math.abs(slots[p.a - 1].lstar - slots[p.b - 1].lstar),
    }))
    .filter((g) => g.dL < GREY_CLOSE);

  return {
    surfaces,
    onSurface,
    slots,
    pairs,
    greyClose,
    textSlots: slots.filter((s) => s.readsAsText).map((s) => s.slot),
    worstCore: worst(pairs.filter((p) => p.b <= T.coreSlots)),
    worstAll: worst(pairs),
    prefix,
  };
};

const weakPairs = (modes) =>
  modes.light.pairs
    .map((light, k) => ({ light, dark: modes.dark.pairs[k] }))
    .filter(({ light, dark }) =>
      [light, dark].some(
        (p) => p.normal < T.normal || CVD_TYPES.some((v) => p[v] < T.cvdWeak),
      ),
    )
    .map(({ light, dark }) => {
      const worstOf = (p) => {
        const type = CVD_TYPES.reduce((m, v) => (p[v] < p[m] ? v : m));
        return { type, value: p[type] };
      };
      return {
        a: light.a,
        b: light.b,
        light: worstOf(light),
        dark: worstOf(dark),
      };
    });

export const validate = () => {
  const tokens = readDsTokens();
  const modes = Object.fromEntries(
    MODES.map((m) => [m, measureMode(tokens, m)]),
  );
  const everySlot = (test) =>
    MODES.every((m) => modes[m].slots.every((s) => test(s)));
  const hueGaps = SLOTS.map((_, i) =>
    hueGap(modes.light.slots[i].oklch.h, modes.dark.slots[i].oklch.h),
  );

  const chromatic = SLOTS.map((_, i) => i);
  const isOwn = (i, from, to) => {
    const own = identityDistance(SLOTS[i][from], SLOTS[i][to]);
    return chromatic.every(
      (j) => j === i || identityDistance(SLOTS[i][from], SLOTS[j][to]) > own,
    );
  };
  const identityFails = chromatic
    .filter((i) => !isOwn(i, "light", "dark") || !isOwn(i, "dark", "light"))
    .map((i) => i + 1);

  const underTarget = Object.fromEntries(
    MODES.map((m) => [
      m,
      modes[m].slots
        .map((s) => ({
          slot: s.slot,
          surfaces: Object.entries(s.contrast)
            .filter(([, c]) => c < T.contrast)
            .map(([k]) => k),
        }))
        .filter((s) => s.surfaces.length),
    ]),
  );

  // Slots within reservedClose of a status or brand colour in some mode, closest first.
  const nearStatus = SLOTS.map((s, i) => {
    const closest = MODES.map((m) => modes[m].slots[i].nearestReserved).reduce(
      (a, b) => (b.deltaE < a.deltaE ? b : a),
    );
    return { slot: i + 1, name: s.name, ...closest };
  })
    .filter((n) => n.deltaE < T.reservedClose)
    .sort((a, b) => a.deltaE - b.deltaE);

  const worstCvd = (which, m) =>
    min(CVD_TYPES.map((v) => modes[m][which][v].value));

  const checks = [
    {
      id: "contrast-surface",
      gate: true,
      label: `Every colour ≥ ${T.contrast}:1 on the chart surface and the page background, both modes`,
      pass: everySlot((s) =>
        CHART_SURFACES.every((k) => s.contrast[k] >= T.contrast),
      ),
    },
    {
      id: "contrast-floor",
      gate: true,
      label: `Every colour ≥ ${T.contrastFloor}:1 on the raised (elevation 8) and dialog (elevation 16) surfaces, both modes`,
      pass: everySlot((s) =>
        Object.values(s.contrast).every((c) => c >= T.contrastFloor),
      ),
    },
    {
      id: "data-fill",
      gate: true,
      label: `Data fills (opacity ${OPACITY.data}) keep ≥ ${T.contrast}:1 on the chart surface and the page background once composited`,
      pass: everySlot((s) => s.dataFillContrast >= T.contrast),
    },
    {
      id: "label-text",
      gate: true,
      label: `Text in --ds-on-surface keeps ≥ ${T.textContrast}:1 on a series-coloured label tint (opacities ${LABEL_FILLS.join(", ")}), both modes`,
      pass: everySlot((s) => s.labelTextContrast >= T.textContrast),
    },
    {
      id: "normal",
      gate: true,
      label: `ΔE2000 ≥ ${T.normal} between any two of ${SLOTS.length} slots, normal vision`,
      pass: MODES.every((m) => modes[m].worstAll.normal.value >= T.normal),
    },
    {
      id: "cvd-core",
      gate: true,
      label: `ΔE2000 ≥ ${T.cvd} between slots 1-${T.coreSlots} under protan, deutan and tritan`,
      pass: MODES.every((m) => worstCvd("worstCore", m) >= T.cvd),
    },
    {
      id: "cvd-all",
      gate: true,
      label: `ΔE2000 ≥ ${T.cvdAll} between any two of ${SLOTS.length} slots under protan, deutan and tritan (the marker carries pairs below ${T.cvdWeak})`,
      pass: MODES.every((m) => worstCvd("worstAll", m) >= T.cvdAll),
    },
    {
      id: "chroma-floor",
      gate: true,
      label: `Every slot has chroma ≥ ${T.minChroma} in both modes`,
      pass: SLOTS.every((_, i) =>
        MODES.every((m) => modes[m].slots[i].oklch.C >= T.minChroma),
      ),
    },
    {
      id: "hue-identity",
      gate: true,
      label: `Each chromatic slot keeps its hue within ${T.hueDrift}° across modes`,
      pass: chromatic.every((i) => hueGaps[i] <= T.hueDrift),
    },
    {
      id: "cross-mode-nearest",
      gate: false,
      label:
        "Each slot's dark value is nearest to its own light value (informational, not gated; see Light and dark identity)",
      pass: identityFails.length === 0,
    },
    {
      id: "second-channel",
      gate: true,
      label: "Every slot has its own marker shape; all lines are solid",
      pass:
        new Set(SLOTS.map((s) => s.marker)).size === SLOTS.length &&
        SLOTS.every((s) => MARKERS.includes(s.marker)),
    },
    {
      id: "reserved",
      gate: false,
      label: `${nearStatus.length} of ${SLOTS.length} slots sit within ΔE ${T.reservedClose} of a status or brand colour in at least one mode (slots ${
        nearStatus
          .map((n) => n.slot)
          .sort((a, b) => a - b)
          .join(", ") || "none"
      }); recorded, not gated`,
      pass: nearStatus.length === 0,
    },
  ];

  return {
    thresholds: T,
    modes,
    weakPairs: weakPairs(modes),
    underTarget,
    hueGaps,
    identityFails,
    nearStatus,
    checks,
    ok: checks.every((c) => !c.gate || c.pass),
  };
};
