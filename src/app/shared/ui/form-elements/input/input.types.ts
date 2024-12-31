import { FormElementSize } from '../common.types';

/**
 * Type definition for input field types
 * @type {('text' | 'email' | 'password' | 'number')}
 */
export type InputType = 'text' | 'email' | 'password' | 'number';

/**
 * Interface for input component properties
 */
export interface InputProps {
    /** Type of input field */
    type: InputType;
    /** Width size of the input field */
    size: FormElementSize;
    /** Placeholder text when input is empty */
    placeholder?: string;
    /** Label text displayed above the input */
    label?: string;
    /** Whether the input is read-only */
    readonly?: boolean;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Optional ID for the input element */
    id?: string;
    /** Helper text displayed below the input */
    hint?: string;
    /** Whether the input is required */
    required?: boolean;
}

/**
 * Interface for input component styles
 */
export interface InputStyles {
    /** Container element styles */
    container: string;
    /** Input element styles */
    input: string;
}
