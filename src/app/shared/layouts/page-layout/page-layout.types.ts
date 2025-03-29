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
        background: 'bg-primaryBlue-hover',
        accent: 'text-slate-200/60',
        neutral: 'text-primaryBlue-link',
    },
    gray: {
        text: 'text-slate-200',
        background: 'bg-primaryGray-hover',
        accent: 'text-gray-500',
        neutral: 'text-primaryBlue',
    },
};
