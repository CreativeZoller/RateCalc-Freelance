/**
 * Interface for checkbox component properties
 */
export interface CheckboxProps {
    /** Optional ID for the checkbox input */
    id?: string;
    /** Value attribute for the checkbox input */
    value: string;
    /** Label text displayed next to the checkbox */
    label: string;
    /** Whether the checkbox is checked */
    checked?: boolean;
    /** Whether the checkbox is disabled */
    disabled?: boolean;
}

/**
 * Interface for checkbox component styles
 */
export interface CheckboxStyles {
    /** Container element styles */
    container: string;
    /** Input element styles */
    input: string;
    /** Custom checkbox styles */
    custom: string;
    /** Label text styles */
    label: string;
}
