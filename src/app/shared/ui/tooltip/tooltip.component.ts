/**
 * A tooltip component that displays additional information when hovering over an element.
 * Features include customizable content, hover-based display, and automatic positioning.
 *
 * @component
 * @example
 * // Basic tooltip
 * <app-tooltip tooltipContent="Additional information">
 *   <button>Hover me</button>
 * </app-tooltip>
 *
 * // Tooltip with longer content
 * <app-tooltip tooltipContent="This is a detailed explanation that appears on hover">
 *   <span class="underline cursor-help">What is this?</span>
 * </app-tooltip>
 *
 * // Tooltip for form field
 * <div class="form-group">
 *   <app-tooltip tooltipContent="Enter your full legal name as it appears on your ID">
 *     <label>Full Name *</label>
 *   </app-tooltip>
 *   <input type="text" />
 * </div>
 *
 * // Tooltip for icon
 * <app-tooltip tooltipContent="Click to save your changes">
 *   <button class="icon-button">
 *     <svg>...</svg>
 *   </button>
 * </app-tooltip>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tooltip',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="relative inline-block">
            <div class="group" (mouseenter)="showTooltip = true" (mouseleave)="showTooltip = false">
                <ng-content></ng-content>

                <div
                    *ngIf="showTooltip"
                    class="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm 
                 dark:bg-gray-dark max-w-xs bottom-full w-full left-0 transform -translate-y-2">
                    {{ tooltipContent }}
                </div>
            </div>
        </div>
    `,
})
export class TooltipComponent {
    /** The text content to display in the tooltip */
    @Input() tooltipContent: string = '';

    /** Controls the visibility state of the tooltip */
    showTooltip = false;
}
