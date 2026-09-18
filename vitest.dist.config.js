import { defineConfig } from "vitest/config";

// Separate from vitest.config.js because these tests require `dist/`, which
// doesn't exist until `pnpm build` runs. Run via `pnpm test:dist`.
export default defineConfig({
  test: {
    environment: "jsdom",
    include: [
      "test/dist-entrypoints.test.ts",
      "test/no-unexpected-bundling.test.ts",
      "test/dist-size.test.ts",
    ],
  },
});
