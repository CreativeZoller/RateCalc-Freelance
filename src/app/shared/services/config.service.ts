import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface AppConfig {
    appName: string;
    appTitle: string;
    appSlogan: string;
    appVersion: string;
}

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private config: AppConfig;

    constructor() {
        this.config = {
            appName: environment.appName,
            appTitle: environment.appTitle,
            appSlogan: environment.appSlogan,
            appVersion: environment.appVersion,
        };
    }

    get appName(): string {
        return this.config.appName;
    }

    get appTitle(): string {
        return this.config.appTitle;
    }

    get appSlogan(): string {
        return this.config.appSlogan;
    }

    get appVersion(): string {
        return this.config.appVersion;
    }
}
