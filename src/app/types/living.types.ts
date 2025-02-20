/**
 * Interface for living expense form data structure
 */
export interface LivingExpenseFormData {
    rent: {
        value: string;
        rate: string;
    };
    utilities: {
        value: string;
        rate: string;
    };
    communication: {
        value: string;
        rate: string;
    };
    meals: {
        value: string;
        rate: string;
    };
    insurance: {
        value: string;
        rate: string;
    };
}

/**
 * Interface for living expense form paragraphs
 */
export interface LivingExpenseParagraph {
    content: string;
    modifier: 'normal' | 'bold' | 'italic' | 'underlined';
}

/**
 * Type for rate options in living expense forms
 */
export interface RateOption {
    label: string;
    value: string;
}
