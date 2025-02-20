import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AppConfig } from 'app/types';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationService {
    private readonly config: AppConfig;

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
