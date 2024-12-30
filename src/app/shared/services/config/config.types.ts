/**
 * Configuration interface for the application settings
 * @interface AppConfig
 */
export interface AppConfig {
    /** The internal application name */
    appName: string;
    /** The display title of the application */
    appTitle: string;
    /** The marketing slogan for the application */
    appSlogan: string;
    /** The current version of the application */
    appVersion: string;
}
