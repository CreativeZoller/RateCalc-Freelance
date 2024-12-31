/**
 * Type definition for button variants
 * @type {('primary' | 'secondary' | 'danger' | 'success')}
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * Type definition for button font weights
 * @type {('normal' | 'semibold' | 'bold')}
 */
export type ButtonFontWeight = 'normal' | 'semibold' | 'bold';

/**
 * Interface for button component properties
 */
export interface ButtonProps {
    /** Visual style variant of the button */
    variant?: ButtonVariant;
    /** Additional CSS classes */
    className?: string;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Font weight of the button text */
    fontWeight?: ButtonFontWeight;
    /** Whether to show an outline style */
    outlined?: boolean;
    /** Whether to render as a link-style button without background/border */
    isLink?: boolean;
}
