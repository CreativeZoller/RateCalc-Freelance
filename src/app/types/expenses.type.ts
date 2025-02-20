/**
 * Types for expense form structure and related interfaces
 */

// Form control structure for expenses
export interface ExpenseFormControl {
    value: string;
    rate?: string;
}

export interface ExpenseFormControls {
    [key: string]: ExpenseFormControl;
}

export interface ExpenseFormData {
    controls: ExpenseFormControls;
}

export interface TimeMetrics {
    workingDays: number;
    daysOff: number;
    hoursPerDay: number;
}

// Form group structure for expenses
export interface ExpenseFormGroup {
    [key: string]: {
        value: string;
        rate: string;
    };
}

// Paragraph structure for expense descriptions
export interface ExpenseParagraph {
    content: string;
    modifier: 'normal' | 'bold' | 'italic' | 'underlined';
}

export type ExpenseRateType = 'daily' | 'monthly' | 'yearly';
// Rate options as constants
export const RATE_OPTIONS = {
    DAILY: '365',
    MONTHLY: '12',
    YEARLY: '1',
} as const;

export type RateOptionValue = (typeof RATE_OPTIONS)[keyof typeof RATE_OPTIONS];

// Detailed expense interfaces
export interface DetailedExpense {
    category: string;
    name: string;
    amount: number;
    rate?: string;
    originalValue?: number;
}

export interface ExpenseCategory {
    name: string;
    total: number;
    items: DetailedExpense[];
}

export interface ExpenseSummary {
    categories: ExpenseCategory[];
    totalExpenses: number;
    timeMetrics: {
        workingDays: number;
        daysOff: number;
        hoursPerDay: number;
    };
}

/**
 * Interface for expense calculation results
 */
export interface ExpenseCalculationResults {
    dailyTotal: number;
    monthlyTotal: number;
    yearlyTotal: number;
    total: number;
}
