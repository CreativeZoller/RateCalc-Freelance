import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant, ButtonFontWeight } from './button.types';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button [class]="getButtonClasses()" [attr.disabled]="disabled ? '' : null" (click)="onClick.emit($event)">
            <ng-content></ng-content>
        </button>
    `,
})
export class ButtonComponent {
    /** Visual style variant of the button */
    @Input() variant: ButtonVariant = 'primary';

    /** Additional CSS classes */
    @Input() className: string = '';

    /** Whether the button is disabled */
    @Input({ transform: booleanAttribute }) disabled: boolean = false;

    /** Font weight of the button text */
    @Input() fontWeight: ButtonFontWeight = 'bold';

    /** Whether to show an outline style */
    @Input({ transform: booleanAttribute }) outlined: boolean = false;

    /** Whether to render as a link-style button without background/border */
    @Input({ transform: booleanAttribute }) isLink: boolean = false;

    /** Event emitted when button is clicked */
    @Output() onClick = new EventEmitter<MouseEvent>();

    private variantClasses: Record<ButtonVariant, string> = {
        primary: 'bg-primaryBlue hover:bg-primaryBlue-hover focus:bg-primaryBlue-focus text-primaryBlue-text',
        secondary: 'bg-primaryGray hover:bg-primaryGray-hover focus:bg-primaryGray-focus text-primaryGray-text',
        success: 'bg-success hover:bg-success-hover focus:bg-success-focus text-success-text',
        danger: 'bg-error hover:bg-error-hover focus:bg-error-focus text-error-text',
    };

    private outlinedVariantClasses: Record<ButtonVariant, string> = {
        primary:
            'border-primaryBlue text-primaryBlue hover:bg-primaryBlue focus:bg-primaryBlue-focus focus:border-primaryBlue-focus hover:text-primaryBlue-text focus:text-primaryBlue-text',
        secondary:
            'border-primaryGray text-primaryGray hover:bg-primaryGray focus:bg-primaryGray-focus focus:border-primaryGray-focus hover:text-primaryGray-text focus:text-primaryGray-text',
        success:
            'border-success text-success hover:bg-success focus:bg-success-focus focus:border-success-focus hover:text-success-link focus:text-success-text',
        danger: 'border-error text-error hover:bg-error focus:bg-error-focus focus:border-error-focus hover:text-error-link focus:text-error-text',
    };

    private linkVariantClasses: Record<ButtonVariant, string> = {
        primary: 'text-primaryBlue hover:text-primaryBlue-hover focus:text-primaryBlue-focus',
        secondary: 'text-primaryGray hover:text-primaryGray-hover focus:text-primaryGray-focus',
        success: 'text-success hover:text-success-hover focus:text-success-focus',
        danger: 'text-error hover:text-error-hover focus:text-error-focus',
    };

    private fontWeightClasses: Record<ButtonFontWeight, string> = {
        normal: 'font-normal',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    getButtonClasses(): string {
        const baseClasses = 'py-2 px-4 rounded-lg transition duration-250 transition ease-in-out';
        const fontWeightClass = this.fontWeightClasses[this.fontWeight];
        const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : '';

        let variantClass = '';
        if (this.isLink) {
            variantClass = this.linkVariantClasses[this.variant];
        } else if (this.outlined) {
            variantClass = `${this.outlinedVariantClasses[this.variant]} bg-transparent border-2`;
        } else {
            variantClass = this.variantClasses[this.variant];
        }

        return `${baseClasses} ${variantClass} ${fontWeightClass} ${this.className} ${disabledClasses}`.trim();
    }
}
