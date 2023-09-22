import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/*.spec.ts'],

  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/lib/common/src/$1',
    '^@common$': '<rootDir>/lib/common/src',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
};

export default config;
