// Regenerates the chart tokens, JSON export, validation report and preview from palette.mjs.
// calc/ computes and validates the colours; present/ turns the results into files.
// `--check` writes nothing and fails if the committed outputs are stale or a gated check fails.
/* global process, console */
import { readFileSync, writeFileSync } from "node:fs";
import { validate } from "./calc/validate.mjs";
import { buildCss } from "./present/css.mjs";
import { buildJson } from "./present/json.mjs";
import { renderPreview } from "./present/preview.mjs";
import { buildMarkdown } from "./present/report.mjs";

const out = (name) => new URL(name, import.meta.url);

const report = validate();
const css = buildCss();
const files = {
  "../../src/styles/diamondDS/DiamondDSChartTokens.css": css,
  "chart-palette.json": buildJson(report),
  "validation.md": buildMarkdown(report),
};

if (process.argv.includes("--check")) {
  const stale = Object.entries(files).filter(([name, text]) => {
    try {
      return readFileSync(out(name), "utf8").replace(/\r\n/g, "\n") !== text;
    } catch {
      return true;
    }
  });
  stale.forEach(([name]) => console.error(`stale: ${name}`));
  report.checks
    .filter((c) => c.gate && !c.pass)
    .forEach((c) => console.error(`failed: ${c.label}`));
  process.exit(stale.length || !report.ok ? 1 : 0);
}

Object.entries({
  ...files,
  // A local page for looking at the palette; it is not committed or checked.
  "render-check.html": renderPreview(report),
}).forEach(([name, text]) => writeFileSync(out(name), text));
report.checks.forEach((c) =>
  console.log(`${c.gate ? (c.pass ? "pass" : "FAIL") : "note"}  ${c.label}`),
);
process.exit(report.ok ? 0 : 1);
