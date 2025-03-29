import { BackgroundColor } from '../types/background.types';
import { StyleConfig } from '../types/style-config.types';

export const styleConfigs: Record<BackgroundColor, StyleConfig> = {
    blue: {
        text: 'text-primaryBlue-text',
        background: 'bg-gradient-to-br from-primaryBlue-hover to-primaryBlue-focus',
        accent: 'text-slate-200/60',
        neutral: 'text-primaryBlue-link',
    },
    gray: {
        text: 'text-primaryGray-text',
        background: 'bg-gradient-to-br from-primaryGray to-primaryGray-focus',
        accent: 'text-slate-200/60',
        neutral: 'text-primaryBlue',
    },
};
