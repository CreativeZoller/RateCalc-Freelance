import { BackgroundColor } from '../types/background.types';
import { StyleConfig } from '../types/style-config.types';

/**
 * Configuration object for different background color styles
 * @type {Record<BackgroundColor, StyleConfig>}
 */
export const styleConfigs: Record<BackgroundColor, StyleConfig> = {
    blue: {
        text: 'text-slate-200',
        background: 'bg-blue-light',
        accent: 'text-slate-200/60',
        neutral: 'text-yellow-base',
    },
    gray: {
        text: 'text-gray-base',
        background: 'bg-gray-light',
        accent: 'text-gray-300',
        neutral: 'text-blue-base',
    },
};
