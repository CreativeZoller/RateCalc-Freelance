/**
 * Interface for progress bar component properties
 */
export interface ProgressBarProps {
    /** The current progress value (0-100) */
    value: string;
    /** Optional CSS class for custom styling */
    className?: string;
    /** Width of the progress bar (e.g., '100%', '200px') */
    length?: string;
    /** Whether to show the floating percentage label */
    showLabel?: boolean;
}

/**
 * Interface for progress bar component styles
 */
export interface ProgressBarStyles {
    /** Container element styles */
    container: string;
    /** Progress indicator styles */
    indicator: string;
}
