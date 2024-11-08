import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";

import packageJson from "../package.json" assert { type: "json" };

export default [
    {
        input: "src/index.ts",
        output: {
            format: "cjs",
            file: packageJson.main
        },
        plugins: [
            peerDepsExternal({
                includeDependencies: true,
            }),
            image(),
            resolve(),
            commonjs(),
            terser(),
            typescript({
                tsconfig: "./configs/tsconfig.json"
            }),
            postcss({
                extensions: [".css"],
            }),
        ],
    },
    {
        input: "src/index.ts",
        output: {
            format: "esm",
            sourcemap: true,
            file: packageJson.module
        },
        plugins: [
            peerDepsExternal({
                includeDependencies: true,
            }),
            image(),
            resolve(),
            commonjs(),
            terser(),
            typescript({
                tsconfig: "./configs/tsconfig.json"
            }),
            postcss({
                extensions: [".css"],
            }),
        ],
    }
];
