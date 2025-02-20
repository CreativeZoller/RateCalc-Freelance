import { Injectable } from '@angular/core';
import { FormSignalService } from './form-signal.service';
import { ExpenseRateType, CalculationFormData, CalculationFormControlData, CalculationServiceResults } from 'app/types';

/**
 * Service for performing calculations on form data
 * @class CalculationService
 *
 * @description
 * This service handles calculations based on form data and rates.
 * It processes values based on their rate category (daily, monthly, yearly)
 * and maintains separate totals for each rate type.
 */
@Injectable({
    providedIn: 'root',
})
export class CalculationService {
    constructor(private readonly formSignalService: FormSignalService) {}

    /**
     * Type guard to check if an object is a valid CalculationFormControlData
     */
    private isValidControl(control: unknown): control is CalculationFormControlData {
        return typeof control === 'object' && control !== null && 'value' in control;
    }

    /**
     * Type guard to check if an object is a valid CalculationFormData
     */
    private isValidCalculationFormData(CalculationFormData: unknown): CalculationFormData is CalculationFormData {
        return typeof CalculationFormData === 'object' && CalculationFormData !== null && 'controls' in CalculationFormData;
    }

    /**
     * Calculates sum of values for a specific form and rate
     */
    calculateRateSum(formId: string, rate: ExpenseRateType): number {
        const CalculationFormData = this.formSignalService.getFormData(formId);

        if (!this.isValidCalculationFormData(CalculationFormData)) {
            return 0;
        }

        return Object.values(CalculationFormData.controls).reduce((sum, control) => {
            if (this.isValidControl(control) && control.rate === rate) {
                const value = parseFloat(control.value as string) || 0;
                return sum + value;
            }
            return sum;
        }, 0);
    }

    /**
     * Calculates totals based on rates for a specific form
     */
    calculateTotals(formId: string): CalculationServiceResults {
        const CalculationFormData = this.formSignalService.getFormData(formId);

        if (!this.isValidCalculationFormData(CalculationFormData)) {
            return { dailyTotal: 0, monthlyTotal: 0, yearlyTotal: 0, total: 0 };
        }

        let dailyTotal = this.calculateRateSum(formId, 'daily');
        let monthlyTotal = this.calculateRateSum(formId, 'monthly');
        let yearlyTotal = this.calculateRateSum(formId, 'yearly');
        let total = this.convertToYearlyTotal({ dailyTotal, monthlyTotal, yearlyTotal });

        // Check for numeric values without a defined rate type
        Object.values(CalculationFormData.controls).forEach((control) => {
            if (this.isValidControl(control) && !control.rate) {
                const numericValue = parseFloat(control.value as string);
                if (!isNaN(numericValue)) {
                    total += numericValue;
                }
            }
        });

        // Store calculation results in form signal
        this.formSignalService.createOrUpdateFormData(formId, {
            ...CalculationFormData.controls,
            calculations: { dailyTotal, monthlyTotal, yearlyTotal, total },
        });

        return { dailyTotal, monthlyTotal, yearlyTotal, total };
    }

    /**
     * Calculates grand totals across all forms
     */
    calculateGrandTotals(): CalculationServiceResults {
        const allForms = this.formSignalService.getAllFormData();

        return allForms.reduce(
            (totals, form) => {
                const formTotals = this.calculateTotals(form.formId);
                return {
                    dailyTotal: totals.dailyTotal + formTotals.dailyTotal,
                    monthlyTotal: totals.monthlyTotal + formTotals.monthlyTotal,
                    yearlyTotal: totals.yearlyTotal + formTotals.yearlyTotal,
                    total: totals.total + formTotals.total,
                };
            },
            { dailyTotal: 0, monthlyTotal: 0, yearlyTotal: 0, total: 0 }
        );
    }

    /**
     * Converts all totals to yearly values for comparison
     */
    convertToYearlyTotal(totals: Partial<CalculationServiceResults>): number {
        return (totals.dailyTotal || 0) * 365 + (totals.monthlyTotal || 0) * 12 + (totals.yearlyTotal || 0);
    }

    /**
     * Calculates totals based on numeric input values from a form
     */
    calculateHolidayTotals(formId: string): void {
        const CalculationFormData = this.formSignalService.getFormData(formId);

        if (!this.isValidCalculationFormData(CalculationFormData)) {
            return;
        }

        const total = Object.values(CalculationFormData.controls)
            .filter((control) => this.isValidControl(control))
            .map((control) => Number(control.value))
            .reduce((sum, val) => sum + val, 0);

        // Store calculation results in form signal
        this.formSignalService.createOrUpdateFormData(formId, {
            ...CalculationFormData.controls,
            totalAvailableDaysOff: total,
        });
    }
}
