import { describe, expect, it } from "vitest";

// Pinned to vitest 4.0.18 / vite 7.3.5, the exact versions a consumer (Atlas)
// reported the 0.7.1 SyntaxError-on-import bug on: Vite's SSR import rewriter
// mangled a minified loop label as if it were an import binding. That bug is
// already fixed in newer Vite/Vitest (see e2e/consumer-smoke, which floats),
// so this fixture is what actually guards against a regression of it.
describe("published package entry points load under old Vitest", () => {
  it("imports from the main entry", async () => {
    const mod = await import("@diamondlightsource/sci-react-ui");
    expect(mod.ThemeProvider).toBeTypeOf("function");
  });

  it("imports from ./controls", async () => {
    const mod = await import("@diamondlightsource/sci-react-ui/controls");
    expect(mod.VisitInput).toBeTypeOf("function");
  });

  it("imports from ./navigation", async () => {
    const mod = await import("@diamondlightsource/sci-react-ui/navigation");
    expect(mod.Navbar).toBeTypeOf("function");
  });

  it("imports from ./themes", async () => {
    const mod = await import("@diamondlightsource/sci-react-ui/themes");
    expect(mod.DiamondDSTheme).toBeDefined();
  });
});
