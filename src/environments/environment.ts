import { AppConfig } from 'app/types';

interface Environment extends AppConfig {
    production: boolean;
    brevoApiKey: string;
}

export const environment: Environment = {
    production: false,
    appName: require('../../package.json').name,
    appTitle: require('../../package.json').releaseName,
    appSlogan: require('../../package.json').releaseSlogan,
    appVersion: require('../../package.json').version,
    brevoApiKey: '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',
};
