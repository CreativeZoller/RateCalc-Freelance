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
                 dark:bg-gray-dark bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2
                 whitespace-normal break-words w-auto max-w-md">
                    <div class="relative">
                        {{ tooltipContent }}
                        <div class="absolute w-2 h-2 bg-gray-900 dark:bg-gray-dark rotate-45 left-1/2 -bottom-1 -translate-x-1/2"></div>
                    </div>
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
