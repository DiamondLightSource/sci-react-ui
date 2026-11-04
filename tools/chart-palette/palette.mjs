// Source of truth for the categorical chart palette. Edit here, then run
// `node tools/chart-palette/build.mjs` to regenerate tokens, JSON and the validation report.

// Each slot has a light and a dark value in the same hue family, each tuned to pass the checks
// in calc/validate.mjs on its own surfaces.
// Slot 3 (wine) is the near-black in light and near-white in dark; it still has a hue.
// Slots 1-8 are the core: colour alone separates them under colour-vision deficiency.
// Slots 9-12 are additional; pairs below the CVD floor are listed in validation.md.
// `marker` is the second channel; every line is solid.
export const SLOTS = [
  {
    name: "violet",
    light: "#8133d6",
    dark: "#9a7efb",
    marker: "plus",
  },
  {
    name: "vermilion",
    light: "#ed604f",
    dark: "#dc5453",
    marker: "square",
  },
  {
    name: "wine",
    light: "#610c12",
    dark: "#ffebeb",
    marker: "diamond",
  },
  {
    name: "lavender",
    light: "#8a8ab9",
    dark: "#7f6d99",
    marker: "triangle",
  },
  {
    name: "indigo",
    light: "#1e3f80",
    dark: "#a7b9fe",
    marker: "circle",
  },
  {
    name: "green",
    light: "#316f5e",
    dark: "#5ab09a",
    marker: "triangleDown",
  },
  {
    name: "rose",
    light: "#b67886",
    dark: "#9a5060",
    marker: "triangleRing",
  },
  {
    name: "amber",
    light: "#a25500",
    dark: "#ffb045",
    marker: "star",
  },
  {
    name: "blue",
    light: "#318ff8",
    dark: "#076cd0",
    marker: "cross",
  },
  {
    name: "khaki",
    light: "#786941",
    dark: "#b8a461",
    marker: "diamondRing",
  },
  {
    name: "fern",
    light: "#589704",
    dark: "#bded9a",
    marker: "squareRing",
  },
  {
    name: "plum",
    light: "#9c5894",
    dark: "#beabba",
    marker: "ring",
  },
];

// Opacity applied to a series colour, e.g. rgb(var(--ds-chart-1-channel) / var(--ds-chart-fill-area)).
export const OPACITY = {
  // Under a line that carries the data; decorative.
  area: 0.16,
  // Range band around a line; decorative only when the band also has a series-coloured edge.
  band: 0.28,
  // Bars, scatter points, heatmap cells: the fill is the data, so it stays opaque.
  data: 1,
  // Fill for a region drawn on an image, with a solid series-coloured border.
  // Hover and selected raise the fill; selected also thickens the border.
  region: 0.14,
  "region-hover": 0.24,
  "region-selected": 0.34,
  // Background tint for a label next to a line, with neutral text on top.
  // Hover and selected raise the tint; selected also thickens the border.
  label: 0.22,
  "label-hover": 0.28,
  "label-selected": 0.34,
};

export const THRESHOLDS = {
  // WCAG 1.4.11 on the surfaces charts are drawn on (--ds-surface, --ds-background).
  contrast: 3,
  // Floor on raised (tooltip, hover) and dialog surfaces.
  // Slots under 3:1 there need labels or a data table.
  contrastFloor: 2.25,
  // ΔE2000 between any two slots, normal vision.
  normal: 15,
  // ΔE2000 between core slots under each simulated CVD type.
  cvd: 13,
  // Below this under some CVD type, a pair is "weak" and documented (any slot).
  cvdWeak: 10,
  // Hard floor for any pair of the 12 slots under any CVD type; the marker carries the rest.
  cvdAll: 7,
  coreSlots: 8,
  // Max OKLCH hue drift for a chromatic slot between modes.
  hueDrift: 20,
  // Chroma below which a colour counts as grey when comparing hues.
  neutralChroma: 0.04,
  // A slot needs at least this much chroma in both modes for its hue to mean anything.
  minChroma: 0.02,
  // Recorded, not gated: a slot within this ΔE of a status or brand colour is called out.
  reservedClose: 7,
  // Series colour as text: WCAG ratio and APCA |Lc|.
  textContrast: 4.5,
  textLc: 60,
};

// Minimum rendering for the second channel to be usable by low-vision readers.
export const LINE = { width: 1.75, marker: 8 };

export const TOKEN_PREFIX = "--ds-chart";
