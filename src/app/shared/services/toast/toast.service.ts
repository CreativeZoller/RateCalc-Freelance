import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from './toast.types';

/**
 * Service for managing toast notifications in the application.
 * Handles displaying and hiding toast messages with automatic timeout.
 *
 * @example
 * ```typescript
 * // In a component
 * constructor(private toastService: ToastService) {
 *   // Show a simple toast
 *   this.toastService.show({
 *     title: 'Success',
 *     description: 'Operation completed successfully'
 *   });
 *
 *   // Show toast and handle manually
 *   this.toastService.show({
 *     title: 'Processing',
 *     description: 'Please wait...'
 *   });
 *   // Later hide it manually
 *   this.toastService.hide();
 *
 *   // Subscribe to toast state
 *   this.toastService.toast$.subscribe(toast => {
 *     if (toast) {
 *       console.log('Toast shown:', toast.title);
 *     }
 *   });
 * }
 * ```
 */
@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastSubject = new BehaviorSubject<Toast | null>(null);
    /** Observable for tracking toast state changes */
    toast$: Observable<Toast | null> = this.toastSubject.asObservable();
    private timeoutId: any;

    /**
     * Shows a toast notification
     * @param {Toast} toast - The toast data to display
     * @description Displays a toast notification that automatically hides after 5 seconds
     */
    show(toast: Toast): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.toastSubject.next(toast);

        this.timeoutId = setTimeout(() => {
            this.hide();
        }, 5000);
    }

    /**
     * Hides the currently displayed toast
     * @description Immediately hides any visible toast and clears the timeout
     */
    hide(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.toastSubject.next(null);
    }
}
