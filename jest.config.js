/** @type {import('jest').Config} */
const config = { testEnvironment: "jsdom",
moduleNameMapper: {
  "^.+.(svg)$": "jest-transform-stub",
}};

export default config;