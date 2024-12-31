import { Injectable } from '@angular/core';
import { FormSignalService } from './form-signal.service';

/**
 * Interface for sales fee calculation results
 */
interface SalesFeesResults {
    /** Total fees for credit card transactions */
    creditCardTotal: number;
    /** Total fees for service transactions */
    serviceTotal: number;
    /** Total fees for other transactions */
    otherTotal: number;
    /** Combined total of all fees */
    total: number;
}

/**
 * Service for calculating sales fees across different transaction types.
 * Handles calculations for credit card, service, and other transaction fees.
 *
 * @class SalesFeesService
 *
 * @description
 * This service processes sales fees data and calculates totals for different fee types.
 * It supports both percentage-based and fixed transaction fees, and can handle
 * different rate types (creditcard, service, other) through both explicit selection
 * and naming convention detection.
 *
 * The service follows these rules for rate type detection:
 * - Names ending with 'c' are treated as credit card fees
 * - Names ending with 's' are treated as service fees
 * - Names ending with 'o' are treated as other fees
 *
 * @example
 * ```typescript
 * // Basic usage
 * const totals = salesFeesService.calculateFees('fees');
 * console.log(totals.creditCardTotal); // Credit card fees total
 *
 * // Get combined total
 * const total = salesFeesService.calculateTotal(totals);
 * console.log(total); // Combined total of all fees
 * ```
 */
@Injectable({
    providedIn: 'root',
})
export class SalesFeesService {
    constructor(private formSignalService: FormSignalService) {}

    /**
     * Calculates sum of values for a specific form and rate type
     * @param {string} formId - Form identifier
     * @param {string} rateType - Rate type to sum (creditcard, service, other)
     * @returns {number} Sum of values for the specified rate type
     */
    private calculateRateSum(formId: string, rateType: string): number {
        const formData = this.formSignalService.getFormData(formId);
        if (!formData) return 0;

        return Object.entries(formData.controls).reduce((sum, [key, group]) => {
            // Check both explicit rate selection and name-based rate type
            const isMatchingRate =
                group.rate === rateType ||
                (key.endsWith('c') && rateType === 'creditcard') ||
                (key.endsWith('s') && rateType === 'service') ||
                (key.endsWith('o') && rateType === 'other');

            if (isMatchingRate) {
                const value = parseFloat(group.value) || 0;
                return sum + value;
            }
            return sum;
        }, 0);
    }

    /**
     * Calculates totals for all fee types for a specific form
     * @param {string} formId - Form identifier to calculate totals for
     * @returns {SalesFeesResults} Object containing calculated totals for each fee type
     */
    calculateFees(formId: string): SalesFeesResults {
        const formData = this.formSignalService.getFormData(formId);
        if (!formData) {
            return {
                creditCardTotal: 0,
                serviceTotal: 0,
                otherTotal: 0,
                total: 0,
            };
        }

        const creditCardTotal = this.calculateRateSum(formId, 'creditcard');
        const serviceTotal = this.calculateRateSum(formId, 'service');
        const otherTotal = this.calculateRateSum(formId, 'other');
        const total = this.calculateTotal({ creditCardTotal, serviceTotal, otherTotal, total: 0 });

        // Store calculation results in form signal
        this.formSignalService.updateFormData(formId, {
            ...formData.controls,
            calculations: { creditCardTotal, serviceTotal, otherTotal, total },
        });

        return { creditCardTotal, serviceTotal, otherTotal, total };
    }

    /**
     * Calculates the combined total of all fee types
     * @param {SalesFeesResults} totals - The totals to combine
     * @returns {number} The combined total of all fees
     */
    calculateTotal(totals: SalesFeesResults): number {
        return totals.creditCardTotal + totals.serviceTotal + totals.otherTotal;
    }

    /**
     * Calculates percentage of total sales for each fee type
     * @param {SalesFeesResults} totals - The fee totals
     * @param {number} totalSales - Total sales amount
     * @returns {Object} Percentage breakdown for each fee type
     */
    calculatePercentages(
        totals: SalesFeesResults,
        totalSales: number
    ): {
        creditCardPercent: number;
        servicePercent: number;
        otherPercent: number;
        totalPercent: number;
    } {
        if (totalSales === 0) return { creditCardPercent: 0, servicePercent: 0, otherPercent: 0, totalPercent: 0 };

        return {
            creditCardPercent: (totals.creditCardTotal / totalSales) * 100,
            servicePercent: (totals.serviceTotal / totalSales) * 100,
            otherPercent: (totals.otherTotal / totalSales) * 100,
            totalPercent: (totals.total / totalSales) * 100,
        };
    }
}
