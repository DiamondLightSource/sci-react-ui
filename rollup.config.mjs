import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import postcssUrl from "postcss-url";
import image from "@rollup/plugin-image";
import path from "path";

import packageJson from "./package.json" with { type: "json" };

export default [
  {
    input: ["src/index.ts", "src/navigation.ts", "src/themes.ts", "src/controls.ts"],
    output: [
      {
        format: "cjs",
        dir: "dist",
        entryFileNames: "[name].cjs.js",
      },
      {
        format: "esm",
        sourcemap: true,
        dir: "dist",
        entryFileNames: "[name].esm.js",
      },
    ],
    plugins: [
      peerDepsExternal(),
      image(),
      resolve(),
      commonjs(),
      terser(),
      typescript({
        tsconfig: "./tsconfig.rollup.json",
      }),
      // Fonts have real font-file assets, so extract to a real .css file
      // consumers import themselves, instead of injecting via JS.
      postcss({
        extensions: [".css"],
        include: /fontsource/,
        extract: "style.css",
        to: path.resolve("dist/style.css"),
        plugins: [postcssUrl({ url: "copy", useHash: false })],
      }),
      // Everything else (tokens, typography) has no file assets, so it's
      // safe to keep auto-injecting via JS.
      postcss({
        extensions: [".css"],
        exclude: /fontsource/,
      }),
    ],
  },
];
