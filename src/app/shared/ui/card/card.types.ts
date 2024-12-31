import { BackgroundColor } from '@layout/page-layout.types';

export interface CardHeader {
    title: string;
    description?: string;
}

export interface CardProps {
    cardClass?: string;
    header?: CardHeader;
    hasFooter?: boolean;
    bgColor?: BackgroundColor;
}

export interface CardStyles {
    container: string;
    header: {
        title: string;
        description: string;
    };
    content: string;
    footer: string;
}
