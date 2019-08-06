module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/test/unit/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$',
  testPathIgnorePatterns: ['/node_modules/', '/endtoend/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
