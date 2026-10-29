// Marker shapes: the second channel for telling series apart without colour. Shared by the
// validator (which shapes exist), the preview page and the Chart Colours docs page.
// Each shape is SVG markup centred on (0, 0), drawn in currentColor. The halo around filled
// shapes, and the fill of hollow ones, comes from --chart-halo (the surface colour).

const R = 4.5;
export const HALO_WIDTH = 1.5;
const HALO = "var(--chart-halo, var(--ds-surface))";

const filled = `fill="currentColor" stroke="${HALO}" stroke-width="${HALO_WIDTH}"`;
const stroked = `fill="none" stroke="currentColor" stroke-width="2"`;
const hollow = `fill="${HALO}" stroke="currentColor" stroke-width="2"`;

const polygon = (points, attrs) =>
  `<polygon points="${points.map((p) => p.map((v) => +v.toFixed(1)).join(",")).join(" ")}" ${attrs}/>`;
const triangle = (s) => [
  [0, -s],
  [s, s * 0.8],
  [-s, s * 0.8],
];
const diamond = (s) => [
  [0, -s * 1.2],
  [s * 1.2, 0],
  [0, s * 1.2],
  [-s * 1.2, 0],
];
const star = Array.from({ length: 10 }, (_, i) => {
  const a = (Math.PI / 5) * i - Math.PI / 2;
  const q = i % 2 ? R * 0.75 : R * 1.7;
  return [q * Math.cos(a), q * Math.sin(a)];
});
const rect = (r, attrs) =>
  `<rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" ${attrs}/>`;

const SHAPES = {
  circle: `<circle r="${R}" ${filled}/>`,
  square: rect(R, filled),
  triangle: polygon(triangle(R + 1), filled),
  triangleDown: polygon(
    triangle(R + 1).map(([x, y]) => [x, -y]),
    filled,
  ),
  diamond: polygon(diamond(R), filled),
  star: polygon(star, filled),
  plus: `<path d="M${-R - 1} 0H${R + 1}M0 ${-R - 1}V${R + 1}" ${stroked}/>`,
  cross: `<path d="M${-R} ${-R}L${R} ${R}M${R} ${-R}L${-R} ${R}" ${stroked}/>`,
  ring: `<circle r="${R - 0.5}" ${hollow}/>`,
  squareRing: rect(R - 0.5, hollow),
  triangleRing: polygon(triangle(R), `${hollow} stroke-linejoin="round"`),
  diamondRing: polygon(diamond(R - 0.5), `${hollow} stroke-linejoin="round"`),
};

export const MARKERS = Object.keys(SHAPES);

export const markerSvg = (shape) => {
  if (!SHAPES[shape]) throw new Error(`Unknown marker shape: ${shape}`);
  return SHAPES[shape];
};

// One <g id="marker-<shape>"> per shape, for <use> in the preview page.
export const markerDefs = () =>
  MARKERS.map((m) => `<g id="marker-${m}">${SHAPES[m]}</g>`).join("");
