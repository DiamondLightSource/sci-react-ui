import { describe, expect, it } from "vitest";

// Reproduces how a real consumer (e.g. Atlas) pulls in the package under
// Vitest: importing from the published tarball, not from repo source. This
// is the check that would have caught the 0.7.1 SyntaxError-on-import bug —
// the built `dist/` output evaluated fine in Node but crashed Vitest's SSR
// import rewriter, something the source-only test suite never exercised.
describe("published package entry points load under Vitest", () => {
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
