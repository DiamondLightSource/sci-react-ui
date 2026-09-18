import { describe, expect, it } from "vitest";
import { distJsContents } from "./dist-helpers";

// Hardcoded independently of rollup.config.mjs's `external` list: if that
// list is what regresses (as it did for utif), reading from it here would
// silently stop checking too.
const expectedExternal = ["utif"];

const distContents = distJsContents();

describe("dependencies that must stay external are not bundled into dist", () => {
  it.each(expectedExternal)(
    "%s is referenced as an import, not inlined",
    (name) => {
      const specifierPattern = new RegExp(
        `(?:require\\(|from)\\s*["']${name.replace(/[/@]/g, "\\$&")}(?:/|["'])`,
      );
      const isReferencedExternally = distContents.some((content) =>
        specifierPattern.test(content),
      );
      expect(isReferencedExternally).toBe(true);
    },
  );
});
