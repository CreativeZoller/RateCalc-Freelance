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
    brevoApiKey: process.env['brevoApiKey'] || '',
};
