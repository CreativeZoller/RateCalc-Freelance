import { SkeletonStyles } from './skeleton.types';
import { BackgroundColor } from '@layout/page-layout.types';

export function getSkeletonStyles(bgColor?: BackgroundColor): SkeletonStyles {
    const color = bgColor === 'gray' ? 'bg-gray-dark/20' : bgColor === 'blue' ? 'bg-slate-200/20' : 'bg-text-default/20';

    return {
        base: 'rounded-md',
        animation: 'animate-pulse',
        color,
    };
}
