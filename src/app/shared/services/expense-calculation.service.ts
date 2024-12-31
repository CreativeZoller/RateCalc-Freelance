import { Injectable } from '@angular/core';
import { FormSignalService } from './form-signal.service';

type RateType = 'daily' | 'monthly' | 'yearly';

/**
 * Interface for expense calculation results
 */
interface ExpenseCalculationResults {
    dailyTotal: number;
    monthlyTotal: number;
    yearlyTotal: number;
    total: number;
}

/**
 * Service for calculating expenses across different rate types
 */
@Injectable({
    providedIn: 'root',
})
export class ExpenseCalculationService {
    constructor(private formSignalService: FormSignalService) {}

    /**
     * Calculates sum of values for a specific form and rate
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
     */
    calculateTotals(formId: string): ExpenseCalculationResults {
        const formData = this.formSignalService.getFormData(formId);
        if (!formData) {
            return { dailyTotal: 0, monthlyTotal: 0, yearlyTotal: 0, total: 0 };
        }

        const dailyTotal = this.calculateRateSum(formId, 'daily');
        const monthlyTotal = this.calculateRateSum(formId, 'monthly');
        const yearlyTotal = this.calculateRateSum(formId, 'yearly');
        const total = this.convertToYearlyTotal({ dailyTotal, monthlyTotal, yearlyTotal });

        this.formSignalService.updateFormData(formId, {
            ...formData.controls,
            calculations: { dailyTotal, monthlyTotal, yearlyTotal, total },
        });

        return { dailyTotal, monthlyTotal, yearlyTotal, total };
    }

    /**
     * Calculates grand totals across all forms
     */
    calculateGrandTotals(): ExpenseCalculationResults {
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
    convertToYearlyTotal(totals: Partial<ExpenseCalculationResults>): number {
        return (totals.dailyTotal || 0) * 365 + (totals.monthlyTotal || 0) * 12 + (totals.yearlyTotal || 0);
    }
}
