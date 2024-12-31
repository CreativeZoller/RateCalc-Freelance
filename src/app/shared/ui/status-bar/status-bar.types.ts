/**
 * Interface for status bar component properties
 */
export interface StatusBarProps {
    /** The current progress value (0-100) */
    value: string;
    /** Width of the status bar (e.g., '100%', '200px') */
    length?: string;
    /** Number of steps to display */
    numOfSteps: number;
    /** Whether to show the progress bar below the steps */
    showProgress: boolean;
}

/**
 * Interface for status bar component styles
 */
export interface StatusBarStyles {
    /** Container element styles */
    container: string;
    /** List element styles */
    list: string;
    /** List item styles */
    item: {
        /** Base styles for list items */
        base: string;
        /** Styles for active list item */
        active: string;
        /** Styles for inactive list items */
        inactive: string;
    };
}
