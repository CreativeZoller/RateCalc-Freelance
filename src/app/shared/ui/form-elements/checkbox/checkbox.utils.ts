import { CheckboxStyles } from './checkbox.types';

export function getCheckboxStyles(disabled: boolean): CheckboxStyles {
    return {
        container: 'min-h-[1.5rem] pl-1',
        input: ['peer', 'absolute', 'h-4', 'w-4', 'opacity-0', 'z-10', disabled ? 'cursor-not-allowed' : 'cursor-pointer'].filter(Boolean).join(' '),
        custom: [
            'absolute',
            'top-0',
            'left-0',
            'h-4',
            'w-4',
            'rounded',
            'border',
            'transition-colors',
            'duration-200',
            'peer-focus:ring-2',
            'peer-focus:ring-offset-2',
            'peer-focus:ring-blue-500',
        ].join(' '),
        label: `ml-3 block text-sm ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 cursor-pointer'}`,
    };
}
