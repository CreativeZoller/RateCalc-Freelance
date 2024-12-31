import { ProgressBarStyles } from './progress-bar.types';

export function getProgressBarStyles(className?: string, length?: string): ProgressBarStyles {
    const containerWidth = length ? `w-[${length}]` : 'w-[20%]';

    return {
        container: `relative pt-12 ${containerWidth}`,
        indicator: `flex h-full items-center justify-center text-white rounded-full ${className || 'bg-blue-base'}`,
    };
}

export function validateProgressValue(value: string): number {
    const numValue = parseInt(value, 10);
    return Math.min(Math.max(numValue, 0), 100);
}
