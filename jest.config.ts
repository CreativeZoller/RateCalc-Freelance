import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@layout/(.*)': '<rootDir>/src/app/shared/layouts/page-layout/$1',
        '@pages/(.*)': '<rootDir>/src/app/pages/$1',
    },
};

export default config;
