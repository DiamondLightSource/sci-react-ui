import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

// Loads the built output directly (run after `pnpm build`), the same way
// Vitest's SSR module runner loads it for a real consumer. Source-only
// tests never touch dist/, so bundling regressions like the utif chunk
// collision only surfaced once a consumer imported the published package.
describe("built dist entry points load without throwing", () => {
  it("loads dist/index.esm.js", async () => {
    const mod = await import("../dist/index.esm.js");
    expect(mod.ThemeProvider).toBeTypeOf("function");
  });

  it("loads dist/controls.esm.js", async () => {
    const mod = await import("../dist/controls.esm.js");
    expect(mod.VisitInput).toBeTypeOf("function");
  });

  it("loads dist/navigation.esm.js", async () => {
    const mod = await import("../dist/navigation.esm.js");
    expect(mod.Navbar).toBeTypeOf("function");
  });

  it("loads dist/themes.esm.js", async () => {
    const mod = await import("../dist/themes.esm.js");
    expect(mod.DiamondDSTheme).toBeDefined();
  });

  it("loads dist/index.cjs.js via require()", () => {
    const require = createRequire(import.meta.url);
    const mod = require("../dist/index.cjs.js");
    expect(mod.ThemeProvider).toBeTypeOf("function");
  });

  it("loads dist/controls.cjs.js via require()", () => {
    const require = createRequire(import.meta.url);
    const mod = require("../dist/controls.cjs.js");
    expect(mod.VisitInput).toBeTypeOf("function");
  });

  it("loads dist/navigation.cjs.js via require()", () => {
    const require = createRequire(import.meta.url);
    const mod = require("../dist/navigation.cjs.js");
    expect(mod.Navbar).toBeTypeOf("function");
  });

  it("loads dist/themes.cjs.js via require()", () => {
    const require = createRequire(import.meta.url);
    const mod = require("../dist/themes.cjs.js");
    expect(mod.DiamondDSTheme).toBeDefined();
  });
});
