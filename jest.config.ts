export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/test.ts",
  ],
};
