import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

const compat = new FlatCompat();

export default [
  {ignores: [
    "**/storybook-static/**",
    "**/*.css",
    "**/*.json",
    "**/*.d.ts",
    "**/dist/*",
    "**/*.html",
    "**/*.svg",
    "**/*.md",
    "babel.config.js",
    "eslint.config.js",
    "jest.config.js",
    "jest.setup.js",
    "rollup.config.mjs",
  ]},
  js.configs.recommended,
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("prettier"),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.eslint.json"
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-console": "off",
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
    settings: {
      react: {
        version: "18",
      },
    },
  },
];
