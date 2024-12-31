import { ToggleStyles } from './toggle.types';

/**
 * Generates styles for the toggle component based on its disabled state
 * @param {boolean} disabled - Whether the toggle is disabled
 * @returns {ToggleStyles} Object containing all necessary style classes
 *
 * @example
 * // Get styles for enabled toggle
 * const styles = getToggleStyles(false);
 *
 * // Get styles for disabled toggle
 * const disabledStyles = getToggleStyles(true);
 */
export function getToggleStyles(disabled: boolean): ToggleStyles {
    // Base input classes for the hidden checkbox
    const baseInputClasses = ['peer', 'sr-only', disabled ? 'cursor-not-allowed' : 'cursor-pointer'];

    // Track classes for the toggle switch background
    const baseTrackClasses = [
        'w-9',
        'h-5',
        'rounded-full',
        'peer',
        'transition-all',
        'ease-in-out',
        'duration-500',
        "after:content-['']",
        'after:absolute',
        'after:top-[2px]',
        'after:left-[2px]',
        'after:bg-white',
        'after:border-gray-300',
        'after:border',
        'after:rounded-full',
        'after:h-4',
        'after:w-4',
        'after:transition-all',
        'dark:border-gray-600',
        'peer-checked:after:translate-x-full',
        'peer-checked:after:border-white',
        'peer-checked:bg-blue-base',
        'peer-focus:outline-none',
        'hover:bg-gray-300',
        'hover:peer-checked:bg-blue-base',
        'bg-gray-200',
        disabled ? "delay-150 peer-checked:after:border-white peer-disabled:opacity-50 after:content-['']" : '',
    ];

    // Thumb classes for the toggle label
    const baseThumbClasses = ['ml-3', 'text-sm', 'font-medium', 'text-gray-600', disabled ? 'cursor-not-allowed' : 'cursor-pointer'];

    return {
        containerLabel: 'relative flex items-center mb-5 cursor-pointer',
        containerDiv: 'flex items-center mb-5',
        input: baseInputClasses.join(' '),
        switch: {
            track: baseTrackClasses.join(' '),
            thumb: baseThumbClasses.join(' '),
        },
        label: `text-sm font-medium ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer'}`,
        labelDouble: 'ml-2 mr-2 mb-5 text-sm font-medium text-gray-600',
    };
}
