module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/src/__test__"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@root/(.*)$": "<rootDir>/src/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@database/(.*)$": "<rootDir>/src/database/$1",
    "^@decorators/(.*)$": "<rootDir>/src/decorators/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/__test__", "<rootDir>/src"],
  forceExit: true,
  testSequencer: "<rootDir>/src/test-sequencer.js",
};
