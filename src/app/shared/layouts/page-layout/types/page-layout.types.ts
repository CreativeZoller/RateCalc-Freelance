import { BackgroundColor } from './background.types';

/**
 * Interface for page layout component properties
 */
export interface PageLayoutProps {
    /** Page title */
    title: string;
    /** Application name */
    appName: string;
    /** Step number for progress indication */
    stepNumber?: string;
    /** Show simplified state of the layout */
    showSimplifiedState?: boolean;
    /** Show scrolling state of the layout */
    showScrollingState?: boolean;
    /** Show tab state of the layout */
    showTabState?: boolean;
    /** Show table state of the layout */
    showTableState?: boolean;
    /** Background color theme */
    bgColor?: BackgroundColor;
    /** Array of paragraph content */
    paragraphs?: Array<{
        /** Paragraph text content */
        content: string;
        /** Text style modifier */
        modifier: 'bold' | 'italic' | 'underlined' | 'normal';
    }>;
}
