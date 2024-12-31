/**
 * A custom pipe for formatting numeric values as currency with various options.
 *
 * @description
 * This pipe formats numbers into currency strings with configurable options for:
 * - Currency type (USD, EUR, GBP)
 * - Decimal places (show/hide)
 * - Proper thousand separators based on currency type
 *
 * @example
 * // Basic usage (defaults to USD)
 * {{ 123456.78 | currencyConverter }}
 * // Output: $123,456
 *
 * // With different currency
 * {{ 123456.78 | currencyConverter:'eur' }}
 * // Output: 123.456 €
 *
 * // With decimals
 * {{ 123456.78 | currencyConverter:'usd':true }}
 * // Output: $123,456.78
 *
 * // GBP example with decimals
 * {{ 123456.78 | currencyConverter:'gbp':true }}
 * // Output: £123,456.78
 */
import { Pipe, PipeTransform } from '@angular/core';

type CurrencyType = 'usd' | 'eur' | 'gbp';

interface CurrencyFormat {
    symbol: string;
    position: 'prefix' | 'suffix';
    thousandsSeparator: string;
    decimalSeparator: string;
}

const CURRENCY_FORMATS: Record<CurrencyType, CurrencyFormat> = {
    usd: {
        symbol: '$',
        position: 'prefix',
        thousandsSeparator: ',',
        decimalSeparator: '.',
    },
    eur: {
        symbol: '€',
        position: 'suffix',
        thousandsSeparator: '.',
        decimalSeparator: ',',
    },
    gbp: {
        symbol: '£',
        position: 'prefix',
        thousandsSeparator: ',',
        decimalSeparator: '.',
    },
};

@Pipe({
    name: 'currencyConverter',
    standalone: true,
})
export class CurrencyConverterPipe implements PipeTransform {
    transform(value: number | string, currency: CurrencyType = 'usd', showDecimals: boolean = false): string {
        // Convert string to number if needed
        const numValue = typeof value === 'string' ? parseFloat(value) : value;

        // Handle invalid numbers
        if (isNaN(numValue)) {
            return '0';
        }

        const format = CURRENCY_FORMATS[currency];

        // Split number into integer and decimal parts
        const [integerPart, decimalPart] = numValue.toFixed(2).split('.');

        // Format integer part with thousand separators
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, format.thousandsSeparator);

        // Construct the final number string
        let numberString = formattedInteger;
        if (showDecimals) {
            numberString += format.decimalSeparator + decimalPart;
        }

        // Add currency symbol in correct position
        return format.position === 'prefix' ? `${format.symbol}${numberString}` : `${numberString} ${format.symbol}`;
    }
}
