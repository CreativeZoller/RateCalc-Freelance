import { ExpenseRateType } from './expense.types';

export interface ServiceFormData {
    formId: string;
    controls: Record<string, unknown>;
}

export interface AppConfig {
    appName: string;
    appTitle: string;
    appSlogan: string;
    appVersion: string;
}

/**
 * Interface for individual form control
 */
export interface CalculationFormControlData {
    value: string | number;
    rate?: ExpenseRateType;
}

/**
 * Interface for form data structure
 */
export interface CalculationFormData {
    controls: Record<string, CalculationFormControlData>;
}

/**
 * Interface for calculation results
 */
export interface CalculationServiceResults {
    dailyTotal: number;
    monthlyTotal: number;
    yearlyTotal: number;
    total: number;
}
