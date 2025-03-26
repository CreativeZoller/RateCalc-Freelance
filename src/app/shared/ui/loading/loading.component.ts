/**
 * A loading indicator component that displays a skeleton loader with text.
 * Used to show loading states during data fetching or processing operations.
 *
 * @component
 * @example
 * // Basic usage in template
 * <app-loading></app-loading>
 *
 * // Usage with conditional rendering
 * <div *ngIf="isLoading">
 *   <app-loading></app-loading>
 * </div>
 *
 * // Usage in router outlet
 * <router-outlet>
 *   <app-loading></app-loading>
 * </router-outlet>
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '@components/skeleton/skeleton.component';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [CommonModule, SkeletonComponent],
    template: `
        <div class="fixed inset-0 flex items-center justify-center">
            <div class="space-y-4">
                <app-skeleton className="h-4 w-48">
                    <span class="sr-only">Loading the app...</span>
                </app-skeleton>
                <p class="text-center text-gray-600 not-sr-only">Loading the app...</p>
            </div>
        </div>
    `,
})
export class LoadingComponent {}
