import { RadioStyles } from './radio.types';

/**
 * Generates styles for the radio component based on its disabled state
 * @param {boolean} disabled - Whether the radio is disabled
 * @returns {RadioStyles} Object containing all necessary style classes
 *
 * @example
 * // Get styles for enabled radio
 * const styles = getRadioStyles(false);
 *
 * // Get styles for disabled radio
 * const disabledStyles = getRadioStyles(true);
 */
export function getRadioStyles(disabled: boolean): RadioStyles {
    // Base input classes for the hidden radio input
    const baseInputClasses = ['peer', 'h-4', 'w-4', 'opacity-0', 'absolute', 'top-0', 'left-0', 'z-10', 'cursor-pointer'];

    // Custom radio button appearance classes
    const baseCustomClasses = [
        'absolute',
        'top-0',
        'left-0',
        'h-4',
        'w-4',
        'rounded-full',
        'border',
        'flex',
        'items-center',
        'justify-center',
        'transition-colors',
        'peer-checked:bg-blue-base',
        'peer-checked:border-blue-base',
        'cursor-pointer',
        disabled ? 'border-gray-200 bg-gray-100' : 'border-gray-300 bg-white',
        disabled ? 'cursor-not-allowed' : 'peer-hover:border-blue-base',
    ];

    // Add disabled state to input if needed
    if (disabled) {
        baseInputClasses.push('cursor-not-allowed');
    }

    return {
        container: 'min-h-[1.5rem] pl-1',
        input: baseInputClasses.join(' '),
        custom: baseCustomClasses.join(' '),
        label: `ml-7 text-sm ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer'}`,
    };
}
