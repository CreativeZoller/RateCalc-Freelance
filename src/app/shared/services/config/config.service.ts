import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AppConfig } from './config.types';

/**
 * Service for managing application-wide configuration settings.
 * Provides access to core application information like name, title, slogan, and version.
 *
 * @example
 * ```typescript
 * // In a component
 * constructor(private configService: ConfigService) {
 *   // Get application title
 *   const title = this.configService.appTitle;
 *
 *   // Access multiple config values
 *   console.log(`${this.configService.appName} v${this.configService.appVersion}`);
 *
 *   // Use in template
 *   // <h1>{{ configService.appTitle }}</h1>
 *   // <p>{{ configService.appSlogan }}</p>
 * }
 * ```
 */
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

    /**
     * Gets the internal application name
     * @returns {string} The application name from configuration
     */
    get appName(): string {
        return this.config.appName;
    }

    /**
     * Gets the display title of the application
     * @returns {string} The application title from configuration
     */
    get appTitle(): string {
        return this.config.appTitle;
    }

    /**
     * Gets the marketing slogan of the application
     * @returns {string} The application slogan from configuration
     */
    get appSlogan(): string {
        return this.config.appSlogan;
    }

    /**
     * Gets the current version of the application
     * @returns {string} The application version from configuration
     */
    get appVersion(): string {
        return this.config.appVersion;
    }
}
