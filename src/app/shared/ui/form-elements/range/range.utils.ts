import { RangeStyles } from './range.types';

export function getRangeStyles(disabled: boolean): RangeStyles {
    const baseRangeClasses = [
        'w-full',
        'h-2',
        'bg-gray-200',
        'rounded-lg',
        'appearance-none',
        'cursor-pointer',
        'focus:outline-none',
        'focus:ring-0',
        'focus:ring-blue-base',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300',
    ];

    return {
        container: 'w-full',
        range: baseRangeClasses.join(' '),
        labels: 'text-xs text-gray-500 select-none',
        value: `text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'} min-w-[3rem]`,
    };
}
