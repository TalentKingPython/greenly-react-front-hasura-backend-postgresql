module.exports = {
  rootDir: __dirname,
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/test.ts?(x)',
    '**/*.test.(ts|tsx)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(jpg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/testUtils/setupTests.ts'],
};
