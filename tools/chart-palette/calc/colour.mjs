// Colour maths for the chart palette checks: sRGB, OKLab/OKLCH, CIEDE2000,
// WCAG contrast and Machado et al. (2009) CVD simulation at severity 1.0.

const clamp01 = (x) => Math.min(1, Math.max(0, x));

export const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

export const rgbToHex = (rgb) =>
  "#" +
  rgb
    .map((v) =>
      Math.round(Math.min(255, Math.max(0, v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");

const toLinear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (v) => {
  const c = clamp01(v);
  return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
};

export const hexToLinear = (hex) => hexToRgb(hex).map(toLinear);
export const linearToHex = (lin) => rgbToHex(lin.map(fromLinear));

export const linearToOklab = ([r, g, b]) => {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

export const hexToOklch = (hex) => {
  const [L, a, b] = linearToOklab(hexToLinear(hex));
  const C = Math.hypot(a, b);
  const h = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return { L, C, h };
};

// CIE Lab (D65) for CIEDE2000.
const linearToLab = ([r, g, b]) => {
  const X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const Z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
  const f = (t) =>
    t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t + 16) / 116;
  const fx = f(X / 0.95047);
  const fy = f(Y);
  const fz = f(Z / 1.08883);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
};

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

export const deltaE2000Lab = ([L1, a1, b1], [L2, a2, b2]) => {
  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const Cbar = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cbar ** 7 / (Cbar ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1);
  const C2p = Math.hypot(a2p, b2);
  const h1p = C1p === 0 ? 0 : (deg(Math.atan2(b1, a1p)) + 360) % 360;
  const h2p = C2p === 0 ? 0 : (deg(Math.atan2(b2, a2p)) + 360) % 360;
  const dLp = L2 - L1;
  const dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) {
    dhp = h2p - h1p;
    if (dhp > 180) dhp -= 360;
    else if (dhp < -180) dhp += 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(rad(dhp / 2));
  const Lbp = (L1 + L2) / 2;
  const Cbp = (C1p + C2p) / 2;
  let hbp = h1p + h2p;
  if (C1p * C2p !== 0) {
    hbp =
      Math.abs(h1p - h2p) <= 180
        ? hbp / 2
        : h1p + h2p < 360
          ? (hbp + 360) / 2
          : (hbp - 360) / 2;
  }
  const T =
    1 -
    0.17 * Math.cos(rad(hbp - 30)) +
    0.24 * Math.cos(rad(2 * hbp)) +
    0.32 * Math.cos(rad(3 * hbp + 6)) -
    0.2 * Math.cos(rad(4 * hbp - 63));
  const dTheta = 30 * Math.exp(-(((hbp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lbp - 50) ** 2) / Math.sqrt(20 + (Lbp - 50) ** 2);
  const Sc = 1 + 0.045 * Cbp;
  const Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(rad(2 * dTheta)) * Rc;
  return Math.sqrt(
    (dLp / Sl) ** 2 +
      (dCp / Sc) ** 2 +
      (dHp / Sh) ** 2 +
      Rt * (dCp / Sc) * (dHp / Sh),
  );
};

// Machado, Oliveira & Fernandes (2009), severity 1.0, applied in linear sRGB.
const MACHADO = {
  protan: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deutan: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritan: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

export const simulateLinear = (lin, vision) => {
  if (vision === "normal") return lin;
  const m = MACHADO[vision];
  return m.map((row) =>
    clamp01(row[0] * lin[0] + row[1] * lin[1] + row[2] * lin[2]),
  );
};

export const labUnder = (hex, vision) =>
  linearToLab(simulateLinear(hexToLinear(hex), vision));

export const deltaE = (hexA, hexB, vision = "normal") =>
  deltaE2000Lab(labUnder(hexA, vision), labUnder(hexB, vision));

export const CVD_TYPES = ["protan", "deutan", "tritan"];

const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

export const simulatedHex = (hex, vision) =>
  linearToHex(simulateLinear(hexToLinear(hex), vision));

export const greyHex = (hex) =>
  linearToHex(Array(3).fill(luminance(hexToLinear(hex))));

// Smallest difference between two hue angles, in degrees.
export const hueGap = (a, b) => {
  const d = Math.abs(a - b) % 360;
  return Math.min(d, 360 - d);
};

export const contrast = (hexA, hexB) => {
  const [hi, lo] = [
    luminance(hexToLinear(hexA)),
    luminance(hexToLinear(hexB)),
  ].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};

// Colour `fg` at `alpha` composited over opaque `bg`, as hex.
export const composite = (fg, bg, alpha) => {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  return rgbToHex(f.map((v, i) => v * alpha + b[i] * (1 - alpha)));
};

// Smallest alpha (0.01 steps) at which `fg` over `bg` reaches `ratio` against `bg`; null if never.
export const minAlphaForContrast = (fg, bg, ratio = 3) => {
  for (let a = 1; a <= 100; a++) {
    if (contrast(composite(fg, bg, a / 100), bg) >= ratio) return a / 100;
  }
  return null;
};

// Distance for "is this the same colour family": OKLab ×100 with lightness
// discounted, since a mode's tuning legitimately shifts lightness.
export const identityDistance = (hexA, hexB) => {
  const [L1, a1, b1] = linearToOklab(hexToLinear(hexA));
  const [L2, a2, b2] = linearToOklab(hexToLinear(hexB));
  return 100 * Math.hypot(0.4 * (L1 - L2), a1 - a2, b1 - b2);
};

// CIE L* (0-100), for greyscale comparisons.
export const lstar = (hex) => labUnder(hex, "normal")[0];

// APCA-W3 0.0.98G Lc of text colour `txt` on background `bg` (negative = light text on dark).
export const apcaLc = (txt, bg) => {
  const Y = (hex) => {
    const [r, g, b] = hexToRgb(hex).map((v) => (v / 255) ** 2.4);
    const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
    return y < 0.022 ? y + (0.022 - y) ** 1.414 : y;
  };
  const yt = Y(txt);
  const yb = Y(bg);
  if (Math.abs(yb - yt) < 0.0005) return 0;
  if (yb > yt) {
    const s = (yb ** 0.56 - yt ** 0.57) * 1.14;
    return s < 0.1 ? 0 : (s - 0.027) * 100;
  }
  const s = (yb ** 0.65 - yt ** 0.62) * 1.14;
  return s > -0.1 ? 0 : (s + 0.027) * 100;
};
