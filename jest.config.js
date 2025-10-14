/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+.(svg)$": "jest-transform-stub",
  },
  // transformIgnorePatterns: ["node_modules/.pnpm/(?!keycloak-js@)"],
  // transformIgnorePatterns: ["<rootDir>/node_modules/.pnpm/keycloak-js@26.2.1/node_modules/keycloak-js/"],
  // transformIgnorePatterns: [`node_modules/(?!.pnpm|keycloak-js)`],
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};

export default config;
