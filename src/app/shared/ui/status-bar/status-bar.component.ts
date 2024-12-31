/**
 * A status bar component that displays progress through a series of steps.
 * Features include evenly spaced step indicators and optional progress bar.
 *
 * @component
 * @example
 * // Basic status bar with 5 steps
 * <app-status-bar
 *   value="50"
 *   [numOfSteps]="5"
 *   [showProgress]="false">
 * </app-status-bar>
 *
 * // Full width status bar with progress indicator
 * <app-status-bar
 *   value="75"
 *   length="100%"
 *   [numOfSteps]="10"
 *   [showProgress]="true">
 * </app-status-bar>
 */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarProps } from './status-bar.types';
import { getStatusBarStyles, validateProgressValue, calculateActiveStep } from './status-bar.utils';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
    selector: 'app-status-bar',
    standalone: true,
    imports: [CommonModule, ProgressBarComponent],
    template: `
        <div [class]="styles.container">
            <ul [class]="styles.list">
                <li *ngFor="let step of steps; let i = index" [class]="getItemClasses(i)">
                    {{ i + 1 }}
                </li>
            </ul>

            <app-progress-bar *ngIf="showProgress" [value]="value" [length]="length" [showLabel]="false"> </app-progress-bar>
        </div>
    `,
})
export class StatusBarComponent implements StatusBarProps, OnChanges {
    @Input({ required: true }) value!: string;
    @Input() length?: string;
    @Input({ required: true }) numOfSteps!: number;
    @Input({ required: true }) showProgress!: boolean;

    currentValue: number = 0;
    activeStep: number = -1;
    steps: number[] = [];
    styles = getStatusBarStyles();

    ngOnInit() {
        this.updateProgress();
        this.updateStyles();
        this.initializeSteps();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
            this.updateProgress();
        }
        if (changes['length']) {
            this.updateStyles();
        }
        if (changes['numOfSteps']) {
            this.initializeSteps();
        }
    }

    private updateProgress() {
        this.currentValue = validateProgressValue(this.value);
        this.activeStep = calculateActiveStep(this.currentValue, this.numOfSteps);
    }

    private updateStyles() {
        this.styles = getStatusBarStyles(this.length);
    }

    private initializeSteps() {
        this.steps = Array.from({ length: this.numOfSteps }, (_, i) => i);
    }

    getItemClasses(index: number): string {
        const isActive = index <= this.activeStep;
        return `${this.styles.item.base} ${isActive ? this.styles.item.active : this.styles.item.inactive}`;
    }
}
