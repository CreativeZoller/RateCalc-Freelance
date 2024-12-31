import { BackgroundColor } from '@layout/page-layout.types';

export interface SkeletonProps {
    className?: string;
    bgColor?: BackgroundColor;
}

export interface SkeletonStyles {
    base: string;
    animation: string;
    color: string;
}
