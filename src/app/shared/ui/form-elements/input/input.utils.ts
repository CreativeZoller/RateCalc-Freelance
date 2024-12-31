import { InputStyles } from './input.types';
import { FormElementSize } from '../common.types';

/**
 * Generates styles for the input component based on its properties
 * @param {FormElementSize} size - Width size of the input field
 * @param {boolean} disabled - Whether the input is disabled
 * @returns {InputStyles} Object containing all necessary style classes
 *
 * @example
 * // Get styles for full-width enabled input
 * const styles = getInputStyles('full', false);
 *
 * // Get styles for half-width disabled input
 * const disabledStyles = getInputStyles('half', true);
 */
export function getInputStyles(size: FormElementSize, disabled: boolean): InputStyles {
    // Width classes based on size prop
    const sizeClasses: Record<FormElementSize, string> = {
        full: 'w-full',
        half: 'w-1/2',
        'one-third': 'w-1/3',
        'two-third': 'w-2/3',
        'one-quarter': 'w-1/4',
        'three-quarter': 'w-3/4',
    };

    // Base input field classes
    const baseInputClasses = [
        'block',
        'px-4 py-2',
        'text-sm font-normal text-gray-900 placeholder-gray-400',
        'rounded-lg',
        'shadow-sm',
        'border border-gray-300',
        'leading-relaxed',
        'duration-75',
        'focus:border-blue-base',
        'focus:outline-none',
        'focus:ring',
        'focus:ring-blue-base',
        'focus:ring-opacity-50',
        'hover:border-blue-base',
        'sm:text-sm',
    ];

    // Add disabled state styles
    if (disabled) {
        baseInputClasses.push('bg-gray-100', 'cursor-not-allowed');
    }

    return {
        container: sizeClasses[size],
        input: `${baseInputClasses.join(' ')} w-full`,
    };
}
