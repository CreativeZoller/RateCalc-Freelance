import { Injectable } from '@angular/core';
import { FormSignalService } from './form-signal.service';

type RateType = 'daily' | 'monthly' | 'yearly';

/**
 * Interface for calculation results
 */
interface CalculationResults {
    dailyTotal: number;
    monthlyTotal: number;
    yearlyTotal: number;
    total: number;
}

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
    constructor(private formSignalService: FormSignalService) {}

    /**
     * Calculates sum of values for a specific form and rate
     * @param {string} formId - Form identifier
     * @param {RateType} rate - Rate type to sum (daily, monthly, yearly)
     * @returns {number} Sum of values for the specified rate
     */
    calculateRateSum(formId: string, rate: RateType): number {
        const formData = this.formSignalService.getFormData(formId);
        if (!formData) return 0;

        const rateValue = rate === 'daily' ? '365' : rate === 'monthly' ? '12' : '1';

        return Object.entries(formData.controls).reduce((sum, [_, group]) => {
            if (group.rate === rateValue) {
                const value = parseFloat(group.value) || 0;
                return sum + value;
            }
            return sum;
        }, 0);
    }

    /**
     * Calculates totals based on rates for a specific form
     * @param {string} formId - Form identifier to calculate totals for
     * @returns {CalculationResults} Object containing calculated totals
     */
    calculateTotals(formId: string): CalculationResults {
        const formData = this.formSignalService.getFormData(formId);
        if (!formData) {
            return { dailyTotal: 0, monthlyTotal: 0, yearlyTotal: 0, total: 0 };
        }

        const dailyTotal = this.calculateRateSum(formId, 'daily');
        const monthlyTotal = this.calculateRateSum(formId, 'monthly');
        const yearlyTotal = this.calculateRateSum(formId, 'yearly');
        const total = this.convertToYearlyTotal({ dailyTotal, monthlyTotal, yearlyTotal });

        // Store calculation results in form signal
        this.formSignalService.updateFormData(formId, {
            ...formData.controls,
            calculations: { dailyTotal, monthlyTotal, yearlyTotal, total },
        });

        return { dailyTotal, monthlyTotal, yearlyTotal, total };
    }

    /**
     * Calculates grand totals across all forms
     * @returns {CalculationResults} Object containing calculated totals
     */
    calculateGrandTotals(): CalculationResults {
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
     * @param {CalculationResults} totals - The totals to convert
     * @returns {number} The combined yearly total
     */
    convertToYearlyTotal(totals: Partial<CalculationResults>): number {
        return (totals.dailyTotal || 0) * 365 + (totals.monthlyTotal || 0) * 12 + (totals.yearlyTotal || 0);
    }
}
