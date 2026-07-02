/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  watchman: false,
  transformIgnorePatterns: [
    "/node_modules/(?!(\\.pnpm|react-native|@react-native|@react-native-community|@react-native-async-storage|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@tanstack/react-query|zustand|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-reanimated))",
    "/node_modules/react-native-reanimated/plugin/",
  ],
  moduleNameMapper: {
    "@react-native-async-storage/async-storage": require.resolve(
      "@react-native-async-storage/async-storage/jest"
    ),
    "\\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/*.d.ts",
  ],
};
