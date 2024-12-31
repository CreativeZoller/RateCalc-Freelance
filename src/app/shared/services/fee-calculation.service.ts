import { Injectable } from '@angular/core';
import { FormSignalService } from './form-signal.service';

/**
 * Interface for fee calculation results
 */
interface FeeCalculationResults {
    creditCardTotal: number;
    serviceTotal: number;
    otherTotal: number;
    total: number;
    percentages: {
        creditCard: number;
        service: number;
        other: number;
    };
    fees: {
        creditCard: number;
        service: number;
        other: number;
    };
}

/**
 * Service for calculating fees across different transaction types
 */
@Injectable({
    providedIn: 'root',
})
export class FeeCalculationService {
    constructor(private formSignalService: FormSignalService) {}

    /**
     * Calculates fees for a specific form
     */
    calculateFees(formId: string): FeeCalculationResults {
        const formData = this.formSignalService.getFormData(formId);
        if (!formData || !formData.controls) {
            return {
                creditCardTotal: 0,
                serviceTotal: 0,
                otherTotal: 0,
                total: 0,
                percentages: {
                    creditCard: 0,
                    service: 0,
                    other: 0,
                },
                fees: {
                    creditCard: 0,
                    service: 0,
                    other: 0,
                },
            };
        }

        // Get range percentages using bracket notation
        const creditCardPercentage = parseFloat(formData.controls['creditcardRange']) || 0;
        const servicePercentage = parseFloat(formData.controls['serviceRange']) || 0;
        const otherPercentage = parseFloat(formData.controls['otherRange']) || 0;

        // Get fee percentages using bracket notation
        const creditCardFee = parseFloat(formData.controls['creditcardFee']) || 0;
        const serviceFee = parseFloat(formData.controls['serviceFee']) || 0;
        const otherFee = parseFloat(formData.controls['otherFee']) || 0;

        // Calculate totals based on percentages and fees
        const creditCardTotal = (creditCardPercentage / 100) * creditCardFee;
        const serviceTotal = (servicePercentage / 100) * serviceFee;
        const otherTotal = (otherPercentage / 100) * otherFee;
        const total = creditCardTotal + serviceTotal + otherTotal;

        const results = {
            creditCardTotal,
            serviceTotal,
            otherTotal,
            total,
            percentages: {
                creditCard: creditCardPercentage,
                service: servicePercentage,
                other: otherPercentage,
            },
            fees: {
                creditCard: creditCardFee,
                service: serviceFee,
                other: otherFee,
            },
        };

        // Store calculation results in form signal
        this.formSignalService.updateFormData(formId, {
            ...formData.controls,
            calculations: results,
        });

        return results;
    }
}
