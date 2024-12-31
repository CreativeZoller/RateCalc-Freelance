/**
 * A toast notification component that displays temporary messages.
 * Automatically hides after a set duration and supports manual dismissal.
 *
 * @component
 * @example
 * // In template
 * <app-toast></app-toast>
 *
 * // In component
 * constructor(private toastService: ToastService) {}
 *
 * showMessage() {
 *   this.toastService.show({
 *     title: 'Success',
 *     description: 'Operation completed successfully'
 *   });
 * }
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            *ngIf="visible"
            class="fixed bottom-4 right-4 z-50 flex items-start gap-4 rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full bg-gradient-to-br from-white to-gray-light"
            role="alert"
            [attr.aria-label]="title">
            <div class="grid gap-1">
                <h3 class="font-semibold text-gray-900">{{ title }}</h3>
                <p class="text-sm text-gray-600">{{ description }}</p>
            </div>
            <button (click)="hideToast()" class="absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:text-gray-900">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `,
})
export class ToastComponent implements OnInit, OnDestroy {
    title: string = '';
    description: string = '';
    visible: boolean = false;
    private subscription: Subscription | null = null;

    constructor(private toastService: ToastService) {}

    ngOnInit() {
        this.subscription = this.toastService.toast$.subscribe((toast) => {
            if (toast) {
                this.title = toast.title;
                this.description = toast.description;
                this.visible = true;
            } else {
                this.visible = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    hideToast() {
        this.toastService.hide();
    }
}
