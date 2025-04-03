import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@layout/(.*)': '<rootDir>/src/app/shared/layouts/page-layout/$1',
        '@pages/(.*)': '<rootDir>/src/app/pages/$1',
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|js|html)$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.html$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};

export default config;
