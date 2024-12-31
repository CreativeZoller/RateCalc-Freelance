import { ProgressBarStyles } from './progress-bar.types';

/**
 * Generates styles for the progress bar component based on its properties
 * @param {string} [className] - Optional CSS class for custom styling
 * @param {string} [length] - Width of the progress bar
 * @param {boolean} [showLabel] - Whether to show the floating percentage label
 * @returns {ProgressBarStyles} Object containing all necessary style classes
 *
 * @example
 * // Get styles for basic progress bar
 * const styles = getProgressBarStyles();
 *
 * // Get styles for full-width progress bar with label
 * const labelStyles = getProgressBarStyles('custom-class', '100%', true);
 */
export function getProgressBarStyles(className?: string, length?: string, showLabel?: boolean): ProgressBarStyles {
    const containerWidth = length ? `w-[${length}]` : 'w-[20%]';
    const paddingTop = showLabel ? 'pt-12' : '';

    return {
        container: `relative ${containerWidth} ${paddingTop}`.trim(),
        indicator: `flex h-full items-center justify-center text-white rounded-full transition-colors duration-300 ${className || 'bg-blue-base'}`,
    };
}

/**
 * Validates and normalizes the progress value to be between 0 and 100
 * @param {string} value - The progress value to validate
 * @returns {number} Normalized progress value between 0 and 100
 */
export function validateProgressValue(value: string): number {
    const numValue = parseInt(value, 10);
    return Math.min(Math.max(numValue, 0), 100);
}
