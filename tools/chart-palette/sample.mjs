// Seeded sample data for the example charts, shared by the preview page and the docs page
// so both draw the same series.
import { SLOTS } from "./palette.mjs";

const rng = (seed) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const slots = (fn) => SLOTS.map((_, k) => fn(k));

// A random walk per slot, 24 points between 6 and 94.
export const lineSeries = slots((k) => {
  const r = rng(101 + k * 17);
  let v = 18 + r() * 64;
  return Array.from({ length: 24 }, (_, i) => {
    v = clamp(v + (r() - 0.5) * 14 + Math.sin(i / 3 + k) * 2, 6, 94);
    return +v.toFixed(1);
  });
});

// A cluster of 7 points per slot, as fractions of the plot area.
export const scatterSeries = slots((k) => {
  const r = rng(5000 + k * 13);
  const [cx, cy] = [14 + r() * 72, 14 + r() * 72];
  const point = (c) =>
    +clamp((c + (r() - 0.5) * 26) / 100, 0.03, 0.97).toFixed(3);
  return Array.from({ length: 7 }, () => [point(cx), point(cy)]);
});

// Four groups of one bar per slot, valued 20 to 92.
export const barSeries = Array.from({ length: 4 }, (_, g) =>
  slots((k) => +(20 + rng(900 + g * 31 + k * 7)() * 72).toFixed(1)),
);
