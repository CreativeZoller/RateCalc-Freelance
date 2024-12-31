/**
 * Type definition for toggle switch layout styles
 * @type {('off' | 'single' | 'double')}
 */
export type ToggleKind = 'off' | 'single' | 'double';

/**
 * Interface for toggle component properties
 */
export interface ToggleProps {
    /** Optional ID for the toggle input */
    id?: string;
    /** Optional name attribute for the toggle input */
    name?: string;
    /** Value attribute for the toggle input */
    value?: string;
    /** Layout style of the toggle */
    kind?: ToggleKind;
    /** Whether the toggle is checked */
    checked?: boolean;
    /** Whether the toggle is disabled */
    disabled?: boolean;
}

/**
 * Interface for toggle component styles
 */
export interface ToggleStyles {
    /** Container label styles */
    containerLabel: string;
    /** Container div styles */
    containerDiv: string;
    /** Input element styles */
    input: string;
    /** Switch styles */
    switch: {
        /** Track element styles */
        track: string;
        /** Thumb element styles */
        thumb: string;
    };
    /** Label text styles */
    label: string;
    /** Double toggle label styles */
    labelDouble: string;
}
