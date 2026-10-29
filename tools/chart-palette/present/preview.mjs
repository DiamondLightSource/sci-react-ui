// Builds render-check.html: an interactive preview of the palette in both modes,
// from the validation report so it can never drift from the tokens.
import { readFileSync } from "node:fs";
import { greyHex, CVD_TYPES, simulatedHex } from "../calc/colour.mjs";
import { CHART_SURFACES } from "../calc/tokens.mjs";
import { GREY_CLOSE, MODES } from "../calc/validate.mjs";
import { markerDefs } from "../markers.mjs";
import { OPACITY, SLOTS, THRESHOLDS } from "../palette.mjs";
import { barSeries, lineSeries, scatterSeries } from "../sample.mjs";
import { round } from "./format.mjs";

const template = readFileSync(
  new URL("./preview.template.html", import.meta.url),
  "utf8",
);

const modeStats = (m) => {
  const min = (xs) => Math.min(...xs);
  const lstars = m.slots.map((s) => s.lstar);
  return {
    normal: round(m.worstAll.normal.value),
    cvdCore: round(min(CVD_TYPES.map((v) => m.worstCore[v].value))),
    cvdAll: round(min(CVD_TYPES.map((v) => m.worstAll[v].value))),
    minContrast: round(
      min(m.slots.flatMap((s) => CHART_SURFACES.map((k) => s.contrast[k]))),
      2,
    ),
    grey: m.greyClose.length,
    pairs: (SLOTS.length * (SLOTS.length - 1)) / 2,
    lmin: Math.round(min(lstars)),
    lmax: Math.round(Math.max(...lstars)),
  };
};

// Colour values the page needs for ordering and vision simulation, so it carries no colour maths.
const modeInfo = (mode, m) =>
  SLOTS.map((s, i) => ({
    L: m.slots[i].lstar,
    C: m.slots[i].oklch.C,
    h: m.slots[i].oklch.h,
    sim: {
      ...Object.fromEntries(
        CVD_TYPES.map((v) => [v, simulatedHex(s[mode], v)]),
      ),
      grey: greyHex(s[mode]),
    },
  }));

export const renderPreview = (report) => {
  const data = {
    core: THRESHOLDS.coreSlots,
    t: { ...THRESHOLDS, greyClose: GREY_CLOSE },
    opacity: OPACITY,
    sample: { line: lineSeries, scatter: scatterSeries, bars: barSeries },
    onSurface: Object.fromEntries(
      MODES.map((m) => [m, report.modes[m].onSurface]),
    ),
    slots: SLOTS.map(({ name, light, dark, marker }) => ({
      name,
      light,
      dark,
      marker,
    })),
    info: Object.fromEntries(
      MODES.map((m) => [m, modeInfo(m, report.modes[m])]),
    ),
    surf: Object.fromEntries(MODES.map((m) => [m, report.modes[m].surfaces])),
    stats: Object.fromEntries(
      MODES.map((m) => [
        m,
        {
          ...modeStats(report.modes[m]),
          under3: report.underTarget[m].length,
        },
      ]),
    ),
  };
  return template
    .replace("/*DATA*/ null", () => JSON.stringify(data))
    .replace("/*MARKERS*/", () => markerDefs());
};
