import { Injectable } from '@angular/core';
import { FormSignalService } from './form-signal.service';
import { DetailedExpense, ExpenseCategory, ExpenseSummary, ExpenseFormData, ExpenseRateType, ExpenseCalculationResults } from 'app/types';

/**
 * Service for calculating expenses across different rate types
 */
@Injectable({
    providedIn: 'root',
})
export class ExpenseCalculationService {
    constructor(private readonly formSignalService: FormSignalService) {}

    /**
     * Calculates sum of values for a specific form and rate
     */
    calculateRateSum(formId: string, rate: ExpenseRateType): number {
        const FormData = this.formSignalService.getFormData(formId) as ExpenseFormData | undefined;
        if (!FormData?.controls) return 0;

        const rateMultiplier = rate === 'daily' ? '365' : rate === 'monthly' ? '12' : '1';

        return Object.values(FormData.controls).reduce<number>((sum, control) => {
            if (control.rate === rateMultiplier && control.value) {
                const value = parseFloat(control.value) || 0;
                return sum + value;
            }
            return sum;
        }, 0);
    }

    /**
     * Calculates totals based on rates for a specific form
     */
    calculateTotals(formId: string): ExpenseCalculationResults {
        const formData = this.formSignalService.getFormData(formId) as ExpenseFormData | undefined;
        if (!formData) {
            return { dailyTotal: 0, monthlyTotal: 0, yearlyTotal: 0, total: 0 };
        }

        const dailyTotal = this.calculateRateSum(formId, 'daily');
        const monthlyTotal = this.calculateRateSum(formId, 'monthly');
        const yearlyTotal = this.calculateRateSum(formId, 'yearly');
        const total = this.convertToYearlyTotal({ dailyTotal, monthlyTotal, yearlyTotal });

        this.formSignalService.createOrUpdateFormData(formId, {
            ...formData.controls,
            calculations: { dailyTotal, monthlyTotal, yearlyTotal, total },
        });

        return { dailyTotal, monthlyTotal, yearlyTotal, total };
    }

    /**
     * Calculates grand totals across all forms
     */
    calculateGrandTotals(): ExpenseCalculationResults {
        return this.formSignalService.getAllFormData().reduce(
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

    /**
     * Calculates detailed expense summary
     */
    calculateDetailedExpenseSummary(): ExpenseSummary {
        const categories: ExpenseCategory[] = [];
        let totalExpenses = 0;

        // Living Expenses
        const livingExpenses = this.calculateCategoryExpenses('living', 'Living');
        if (livingExpenses.items.length > 0) {
            categories.push(livingExpenses);
            totalExpenses += livingExpenses.total;
        }

        // Travel Expenses
        const travelExpenses = this.calculateCategoryExpenses('travel', 'Travel');
        if (travelExpenses.items.length > 0) {
            categories.push(travelExpenses);
            totalExpenses += travelExpenses.total;
        }

        // Business Expenses
        const businessCategories = [
            { id: 'business1', name: 'Essential Business' },
            { id: 'business2', name: 'Optional Business' },
            { id: 'business3', name: 'Additional Business' },
        ];

        businessCategories.forEach(({ id, name }) => {
            const businessExpenses = this.calculateCategoryExpenses(id, name);
            if (businessExpenses.items.length > 0) {
                categories.push(businessExpenses);
                totalExpenses += businessExpenses.total;
            }
        });

        // Time Metrics
        const timeMetrics = this.calculateTimeMetrics();

        const result = {
            categories,
            totalExpenses,
            timeMetrics,
        };

        return result;
    }

    private calculateCategoryExpenses(formId: string, categoryName: string): ExpenseCategory {
        const formData = this.formSignalService.getFormData(formId) as ExpenseFormData | undefined;
        const items: DetailedExpense[] = [];
        let total = 0;

        if (formData?.controls) {
            Object.entries(formData.controls).forEach(([key, control]) => {
                if (control.value && control.rate) {
                    const amount = this.calculateYearlyAmount(parseFloat(control.value), control.rate);
                    items.push({
                        category: categoryName,
                        name: this.formatExpenseName(key),
                        amount,
                        rate: control.rate,
                        originalValue: parseFloat(control.value),
                    });
                    total += amount;
                }
            });
        }

        return {
            name: categoryName,
            total,
            items,
        };
    }

    private calculateTimeMetrics() {
        const workOffData = this.formSignalService.getFormData('workOff') as ExpenseFormData | undefined;
        const workOnData = this.formSignalService.getFormData('workOn') as ExpenseFormData | undefined;

        if (!workOffData?.controls || !workOnData?.controls) {
            // todo: use toast service instead
            console.warn('Work off or work on data is missing');
            return {
                workingDays: 0,
                daysOff: 0,
                hoursPerDay: 0,
            };
        }

        const holidays = parseFloat(workOffData.controls['holidays']?.value || '0');
        const sickleaves = parseFloat(workOffData.controls['sickleaves']?.value || '0');
        const vacations = parseFloat(workOffData.controls['vacations']?.value || '0');
        const daysOff = holidays + sickleaves + vacations;

        const workdays = parseFloat(workOnData.controls['workdays']?.value || '0');
        const workhours = parseFloat(workOnData.controls['workhours']?.value || '0');

        const workingDays = workdays > 0 ? Math.floor(((365 - daysOff) / 7) * workdays) : 365 - daysOff;

        return {
            workingDays,
            daysOff,
            hoursPerDay: workhours,
        };
    }

    private calculateYearlyAmount(value: number, rate: string): number {
        switch (rate) {
            case '365':
                return value * 365;
            case '12':
                return value * 12;
            case '1':
                return value;
            default:
                return value;
        }
    }

    private formatExpenseName(key: string): string {
        return key
            .split('.')[0]
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}
