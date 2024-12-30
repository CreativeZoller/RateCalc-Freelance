import { BackgroundColor } from '@layout/page-layout.types';

export interface ScrollAreaProps {
    className?: string;
    bgColor?: BackgroundColor;
}

export interface ScrollAreaStyles {
    base: string;
    scrollbar: {
        track: string;
        thumb: {
            default: string;
            hover: string;
            active: string;
        };
    };
}
