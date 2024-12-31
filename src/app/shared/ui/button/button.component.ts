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
        primary: 'bg-blue-base hover:bg-blue-dark text-white',
        success: 'bg-green-base hover:bg-green-dark text-white',
        secondary: 'bg-gray-base hover:bg-gray-dark text-white',
        danger: 'bg-red-base hover:bg-red-dark text-white',
    };

    private outlinedVariantClasses: Record<ButtonVariant, string> = {
        primary: 'border-blue-base text-blue-base hover:bg-blue-base hover:text-white',
        success: 'border-green-base text-green-base hover:bg-green-base hover:text-white',
        secondary: 'border-gray-base text-gray-base hover:bg-gray-base hover:text-white',
        danger: 'border-red-base text-red-base hover:bg-red-base hover:text-white',
    };

    private linkVariantClasses: Record<ButtonVariant, string> = {
        primary: 'text-blue-base hover:text-blue-dark',
        success: 'text-green-base hover:text-green-dark',
        secondary: 'text-gray-base hover:text-gray-dark',
        danger: 'text-red-base hover:text-red-dark',
    };

    private fontWeightClasses: Record<ButtonFontWeight, string> = {
        normal: 'font-normal',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    getButtonClasses(): string {
        const baseClasses = 'py-2 px-4 rounded-lg transition duration-300';
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
