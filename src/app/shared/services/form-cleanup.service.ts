import { Injectable } from '@angular/core';
import { ExpenseFormControl } from 'app/types';

@Injectable({
    providedIn: 'root',
})
export class FormCleanupService {
    cleanExpenseFormValues(values: Record<string, ExpenseFormControl>): Record<string, ExpenseFormControl> {
        const cleaned: Record<string, ExpenseFormControl> = {};

        Object.keys(values).forEach((key) => {
            const group = values[key];
            const value = group.value;
            const rate = group.rate;

            // Only include groups that have a non-zero value
            if (value && parseFloat(value) !== 0) {
                cleaned[key] = {
                    value: value,
                    rate: rate,
                };
            } else {
                cleaned[key] = {
                    value: '',
                    rate: '',
                };
            }
        });

        return cleaned;
    }
}
