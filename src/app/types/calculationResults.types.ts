/**
 * Types for summary components
 */

export interface SummaryListItem {
    content: string;
}

export interface SummaryTableContent {
    tableHeaders: string[];
    tableContent: string[][];
}

export interface FormTotals {
    livingTotal: number;
    travelTotal: number;
    business1Total: number;
    business2Total: number;
    business3Total: number;
}

export interface PhaseTotals {
    phaseDailyTotal: number;
    phaseMonthlyTotal: number;
    phaseYearlyTotal: number;
    phaseTotal: number;
}

export interface CalculationResults {
    totalDaysOff: number;
    totalWorkingTime: number;
    workhours: number;
    minHourlyRate: number;
    minDailyRate: number;
    minMonthlyRate: number;
}

export interface ListItem {
    content: string;
}

export interface FormControlData {
    value: number;
}

export interface CustomFormData {
    controls: { [key: string]: FormControlData };
    formId: string;
}
