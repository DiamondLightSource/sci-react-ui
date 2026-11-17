import { readFileSync } from "node:fs";

const TOKEN_FILE = new URL(
  "../../../src/styles/diamondDS/DiamondDSTokens.css",
  import.meta.url,
);

// The token block is the rule whose selector starts a line, so comments that mention the
// selector, or declarations inside other rules, are never read as it.
const parseBlock = (css, selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`^${escaped}\\s*\\{`, "m").exec(css);
  if (!match) throw new Error(`DiamondDSTokens.css: no ${selector} block`);
  const bodyStart = match.index + match[0].length;
  const body = css.slice(bodyStart, css.indexOf("\n}", bodyStart));
  const tokens = {};
  for (const [, name, value] of body.matchAll(/(--ds-[\w-]+):\s*([^;]+);/g)) {
    tokens[name] = value.trim();
  }
  return tokens;
};

export const readDsTokens = () => {
  const css = readFileSync(TOKEN_FILE, "utf8");
  return {
    light: parseBlock(css, '[data-mode="light"]'),
    dark: parseBlock(css, '[data-mode="dark"]'),
  };
};

// Surfaces a series mark must read against. Charts are drawn on the surface or the
// page background; raised is the menu/popover band (elevation 8) that hover cards and
// tooltips sit on, and dialog (elevation 16) is the highest surface that shows series colours.
export const SURFACE_TOKENS = {
  surface: "--ds-surface",
  background: "--ds-background",
  raised: "--ds-elevation-8",
  dialog: "--ds-elevation-16",
};

// The surfaces a chart may be drawn on, where the hard 3:1 applies.
export const CHART_SURFACES = ["surface", "background"];

// Colours a series must not be mistaken for: statuses and primary/brand, in
// every role that can appear as a mark or text colour.
const RESERVED_INTENTS = [
  "danger",
  "success",
  "warning",
  "info",
  "primary",
  "brand",
];
const RESERVED_ROLES = ["", "-emphasis", "-accent", "-solid"];

export const reservedTokenNames = () =>
  RESERVED_INTENTS.flatMap((intent) =>
    RESERVED_ROLES.map((role) => `--ds-${intent}${role}`),
  );

const need = (tokens, mode, name) => {
  const value = tokens[mode][name];
  if (!/^#[0-9a-f]{6}$/i.test(value ?? ""))
    throw new Error(`DiamondDSTokens.css: ${mode} ${name} is not a hex colour`);
  return value;
};

export const surfacesFor = (tokens, mode) =>
  Object.fromEntries(
    Object.entries(SURFACE_TOKENS).map(([key, name]) => [
      key,
      need(tokens, mode, name),
    ]),
  );

export const reservedFor = (tokens, mode) =>
  reservedTokenNames().map((name) => ({
    name,
    hex: need(tokens, mode, name),
  }));

export const onSurfaceFor = (tokens, mode) =>
  need(tokens, mode, "--ds-on-surface");
