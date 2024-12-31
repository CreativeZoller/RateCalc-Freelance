/**
 * A reusable button component that supports different variants and styles.
 *
 * @component
 * @example
 * // Primary button
 * <app-button variant="primary" (onClick)="handleClick()">
 *   Click me
 * </app-button>
 *
 * // Success button with custom class
 * <app-button
 *   variant="success"
 *   className="mt-4"
 *   (onClick)="handleSuccess()">
 *   Save changes
 * </app-button>
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant } from './button.types';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button [class]="getButtonClasses()" (click)="onClick.emit($event)">
            <ng-content></ng-content>
        </button>
    `,
})
export class ButtonComponent {
    @Input() variant: ButtonVariant = 'primary';
    @Input() className: string = '';
    @Output() onClick = new EventEmitter<MouseEvent>();

    private variantClasses: Record<ButtonVariant, string> = {
        primary: 'bg-blue-base hover:bg-blue-dark text-white',
        success: 'bg-green-base hover:bg-green-dark text-white',
        secondary: 'bg-gray-base hover:bg-gray-dark text-white',
        danger: 'bg-red-base hover:bg-red-dark text-white',
    };

    getButtonClasses(): string {
        const baseClasses = 'font-bold py-2 px-4 rounded-lg transition duration-300';
        const variantClass = this.variantClasses[this.variant];
        return `${baseClasses} ${variantClass} ${this.className}`.trim();
    }
}
