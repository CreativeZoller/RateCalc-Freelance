import { FormElementSize } from '../common.types';

/**
 * Interface for select option data
 */
export interface SelectData {
    /** Display text for the option */
    label: string;
    /** Value of the option */
    value: string | number;
}

/**
 * Interface for select component properties
 */
export interface SelectProps {
    /** Optional name attribute for the select element */
    name?: string;
    /** Label text displayed above the select */
    label?: string;
    /** Whether the select is disabled */
    disabled?: boolean;
    /** Whether the select is required */
    required?: boolean;
    /** Whether multiple options can be selected */
    multiselect?: boolean;
    /** Width size of the select element */
    size: FormElementSize;
    /** Array of options for the select */
    data: SelectData[];
}

/**
 * Interface for select component styles
 */
export interface SelectStyles {
    /** Container element styles */
    container: string;
    /** Select element styles */
    select: string;
    /** Option group styles */
    optgroup: string;
}
