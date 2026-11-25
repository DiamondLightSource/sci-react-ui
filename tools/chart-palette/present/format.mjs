import { hexToRgb } from "../calc/colour.mjs";
import { TOKEN_PREFIX } from "../palette.mjs";

export const channel = (hex) => hexToRgb(hex).join(" ");
export const tokenName = (i) => `${TOKEN_PREFIX}-${i + 1}`;
export const round = (x, places = 1) =>
  Math.round(x * 10 ** places) / 10 ** places;
