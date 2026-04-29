import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";

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
      peerDepsExternal({
        includeDependencies: true,
      }),
      image(),
      resolve(),
      commonjs(),
      terser(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.stories.*", "**/*.test.*"],
      }),
      postcss({
        extensions: [".css"],
      }),
    ],
  },
];
