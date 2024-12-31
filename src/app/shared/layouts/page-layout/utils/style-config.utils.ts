import { BackgroundColor } from '../types/background.types';
import { StyleConfig } from '../types/style-config.types';

export const styleConfigs: Record<BackgroundColor, StyleConfig> = {
    blue: {
        text: 'text-slate-200',
        background: 'bg-gradient-to-br from-blue-light to-blue-dark',
        accent: 'text-slate-200/60',
        neutral: 'text-yellow-base',
    },
    gray: {
        text: 'text-gray-base',
        background: 'bg-gradient-to-br from-rose-50 to-gray-light',
        accent: 'text-gray-300',
        neutral: 'text-blue-base',
    },
};
