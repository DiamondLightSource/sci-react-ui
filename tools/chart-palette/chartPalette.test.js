// @vitest-environment node
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";

describe("chart palette", () => {
  it("passes the gated checks and the committed outputs are current", () => {
    const build = fileURLToPath(new URL("./build.mjs", import.meta.url));
    const result = spawnSync(process.execPath, [build, "--check"], {
      encoding: "utf8",
    });
    expect(result.status, result.stderr).toBe(0);
  });
});
