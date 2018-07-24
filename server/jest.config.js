module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', './js'],
  coverageReporters: ['lcov', 'html'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}
