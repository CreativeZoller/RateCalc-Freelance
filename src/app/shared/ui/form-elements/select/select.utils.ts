import { SelectStyles } from './select.types';
import { FormElementSize } from '../common.types';

/**
 * Generates styles for the select component based on its properties
 * @param {FormElementSize} size - Width size of the select element
 * @param {boolean} disabled - Whether the select is disabled
 * @param {boolean} multiselect - Whether multiple options can be selected
 * @returns {SelectStyles} Object containing all necessary style classes
 *
 * @example
 * // Get styles for full-width enabled select
 * const styles = getSelectStyles('full', false);
 *
 * // Get styles for half-width disabled multiselect
 * const multiStyles = getSelectStyles('half', true, true);
 */
export function getSelectStyles(size: FormElementSize, disabled: boolean, multiselect?: boolean): SelectStyles {
    // Width classes based on size prop
    const sizeClasses: Record<FormElementSize, string> = {
        full: 'w-full',
        half: 'w-1/2',
        'one-third': 'w-1/3',
        'two-third': 'w-2/3',
        'one-quarter': 'w-1/4',
        'three-quarter': 'w-3/4',
    };

    // Base select element classes
    const baseSelectClasses = [
        'block',
        'w-full',
        'px-4 py-2',
        'text-sm font-normal text-gray-900',
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

    // Add height for single select
    if (!multiselect) {
        baseSelectClasses.push('h-10');
    }

    // Add disabled styles
    if (disabled) {
        baseSelectClasses.push('bg-gray-100', 'cursor-not-allowed');
    }

    return {
        container: sizeClasses[size],
        select: baseSelectClasses.join(' '),
        optgroup: 'font-semibold text-gray-700',
    };
}
