/**
 * A customizable progress bar component that displays progress as a percentage.
 * Supports custom colors, widths, and dynamic updates. Can optionally display a floating
 * percentage label above the progress bar.
 *
 * @component
 * @example
 * // Basic progress bar without label
 * <app-progress-bar value="50"></app-progress-bar>
 *
 * // Full width progress bar with label
 * <app-progress-bar
 *   value="75"
 *   length="100%"
 *   [showLabel]="true">
 * </app-progress-bar>
 *
 * // Progress bar with custom color and no label
 * <app-progress-bar
 *   value="30"
 *   className="bg-blue-500"
 *   [showLabel]="false">
 * </app-progress-bar>
 *
 * // Progress bar with dynamic value and label
 * <app-progress-bar
 *   [value]="progressValue"
 *   length="50%"
 *   [showLabel]="true">
 * </app-progress-bar>
 */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarProps } from './progress-bar.types';
import { getProgressBarStyles, validateProgressValue } from './progress-bar.utils';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div role="progressbar" [attr.aria-valuemin]="0" [attr.aria-valuemax]="100" [attr.aria-valuenow]="currentValue" [class]="styles.container">
            <span
                *ngIf="showLabel"
                class="absolute bottom-0 mb-5 -translate-x-1/2 w-12 h-10 bg-white shadow-[0px_12px_30px_0px_rgba(16,24,40,0.1)] rounded-full px-3.5 py-2 text-gray-800 text-xs font-medium flex justify-center items-center after:absolute after:bg-white after:flex after:bottom-[-5px] after:left-1/2 after:-z-10 after:h-3 after:w-3 after:-translate-x-1/2 after:rotate-45"
                style="left: {{ currentValue }}%">
                {{ currentValue }}%
            </span>

            <div class="relative flex w-full h-2.5 overflow-hidden rounded-full bg-gray-200">
                <div
                    role="progressbar"
                    [attr.aria-valuenow]="currentValue"
                    [attr.aria-valuemin]="0"
                    [attr.aria-valuemax]="100"
                    style="width: {{ currentValue }}%"
                    [class]="styles.indicator"></div>
            </div>
        </div>
    `,
})
export class ProgressBarComponent implements ProgressBarProps, OnChanges {
    /** The current progress value (0-100) */
    @Input({ required: true }) value!: string;

    /** Optional CSS class for custom styling */
    @Input() className?: string;

    /** Width of the progress bar (e.g., '100%', '200px') */
    @Input() length?: string;

    /** Whether to show the floating percentage label */
    @Input() showLabel: boolean = false;

    currentValue: number = 0;
    styles = getProgressBarStyles();

    ngOnInit() {
        this.updateProgress();
        this.updateStyles();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
            this.updateProgress();
        }
        if (changes['className'] || changes['length'] || changes['showLabel']) {
            this.updateStyles();
        }
    }

    private updateProgress() {
        this.currentValue = validateProgressValue(this.value);
    }

    private updateStyles() {
        this.styles = getProgressBarStyles(this.className, this.length, this.showLabel);
    }
}
