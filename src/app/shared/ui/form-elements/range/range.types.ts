/**
 * Interface for range component properties
 */
export interface RangeProps {
    /** Optional ID for the range input */
    id?: string;
    /** Label text displayed above the range */
    label?: string;
    /** Whether to show percentage labels */
    showLabels?: boolean;
    /** Whether the range is disabled */
    disabled?: boolean;
    /** Whether the range is required */
    required?: boolean;
    /** Group name for linked ranges */
    groupName?: string;
    /** Position number in the group */
    groupNumber?: number;
}

/**
 * Interface for range component styles
 */
export interface RangeStyles {
    /** Container element styles */
    container: string;
    /** Range input styles */
    range: string;
    /** Label styles */
    labels: string;
    /** Value display styles */
    value: string;
}
