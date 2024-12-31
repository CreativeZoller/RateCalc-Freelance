/**
 * A skeleton loading component that provides a placeholder animation while content is loading.
 * Supports different background colors and custom styling for loading states.
 *
 * @component
 * @example
 * // Basic skeleton loader
 * <app-skeleton className="h-4 w-48">
 *   <span class="sr-only">Loading...</span>
 * </app-skeleton>
 *
 * // Card skeleton with custom background
 * <app-skeleton
 *   className="h-32 w-full rounded-lg"
 *   [bgColor]="'gray'">
 * </app-skeleton>
 *
 * // Multiple skeleton items for list
 * <div class="space-y-4">
 *   <app-skeleton className="h-4 w-full"></app-skeleton>
 *   <app-skeleton className="h-4 w-3/4"></app-skeleton>
 *   <app-skeleton className="h-4 w-1/2"></app-skeleton>
 * </div>
 *
 * // Avatar skeleton
 * <app-skeleton className="h-12 w-12 rounded-full">
 *   <span class="sr-only">Loading avatar...</span>
 * </app-skeleton>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonProps } from './skeleton.types';
import { getSkeletonStyles } from './skeleton.utils';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-skeleton',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [class]="getSkeletonClasses()">
            <ng-content></ng-content>
        </div>
    `,
})
export class SkeletonComponent implements SkeletonProps {
    @Input() className?: string;
    @Input() bgColor?: BackgroundColor;

    private get styles() {
        return getSkeletonStyles(this.bgColor);
    }

    getSkeletonClasses(): string {
        const { base, animation, color } = this.styles;
        const classes = `${base} ${animation} ${color}`;
        return this.className ? `${classes} ${this.className}` : classes;
    }
}
