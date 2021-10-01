// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    "clearMocks": true,
    "coverageDirectory": "coverage",
    "coverageProvider": "v8",
    "roots": [
      "<rootDir>/test"
    ],
    "moduleFileExtensions": ["ts", "js"],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "testTimeout": 50000
  };