/**
 * Interface for radio component properties
 */
export interface RadioProps {
    /** Optional ID for the radio input */
    id?: string;
    /** Name attribute for the radio group */
    name?: string;
    /** Value attribute for the radio input */
    value?: string;
    /** Label text displayed next to the radio */
    label: string;
    /** Whether the radio is checked */
    checked?: boolean;
    /** Whether the radio is disabled */
    disabled?: boolean;
}

/**
 * Interface for radio component styles
 */
export interface RadioStyles {
    /** Container element styles */
    container: string;
    /** Input element styles */
    input: string;
    /** Custom radio button styles */
    custom: string;
    /** Label text styles */
    label: string;
}
