import { describe, expect, it } from "vitest";
import baseline from "./dist-size-baseline.json" with { type: "json" };
import { totalDistJsBytes } from "./dist-helpers";

// Catches a dependency silently getting bundled without crashing anything
// (the failure mode utif would have been if its label hadn't collided with
// an import name). If this fails from legitimate growth, update the
// baseline; if the jump is unexplained, something got bundled that
// shouldn't have been.
const TOLERANCE = 0.25;

describe("dist bundle size stays within expected bounds", () => {
  it("total dist/*.js size hasn't grown unexpectedly", () => {
    expect(totalDistJsBytes()).toBeLessThanOrEqual(
      baseline.totalBytes * (1 + TOLERANCE),
    );
  });
});
