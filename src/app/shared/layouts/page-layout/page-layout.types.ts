export type BackgroundColor = 'blue' | 'gray';

export interface PageLayoutProps {
    title: string;
    appName: string;
    stepNumber?: string;
    showSimplifiedState?: boolean;
    showScrollingState?: boolean;
    showTabState?: boolean;
    showTableState?: boolean;
    bgColor?: BackgroundColor;
    paragraphs?: Array<{
        content: string;
        modifier: 'bold' | 'italic' | 'underlined' | 'normal';
    }>;
}

export interface StyleConfig {
    text: string;
    background: string;
    accent: string;
    neutral: string;
}

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
