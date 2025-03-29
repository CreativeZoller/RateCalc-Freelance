import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';
import { Toast } from '@services/toast/toast.types';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            *ngIf="toast"
            class="fixed bottom-4 right-4 z-50 flex items-start gap-4 rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full bg-gradient-to-br from-white to-primaryGray-hover"
            role="alert"
            [attr.aria-label]="toast.title">
            <div class="grid gap-1">
                <h3 class="font-semibold text-gray-900">{{ toast.title }}</h3>
                <p class="text-sm text-gray-600">{{ toast.description }}</p>
            </div>
            <button
                (click)="hideToast()"
                class="absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primaryBlue">
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
                <span class="sr-only">Close</span>
            </button>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
                pointer-events: none;
            }

            div[role='alert'] {
                pointer-events: auto;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .animate-in {
                animation: slideIn 0.3s ease-out;
            }

            .animate-out {
                animation: slideOut 0.3s ease-in;
            }
        `,
    ],
})
export class ToastComponent implements OnInit, OnDestroy {
    toast: Toast | null = null;
    private subscription: Subscription | null = null;

    constructor(private toastService: ToastService) {}

    ngOnInit() {
        this.subscription = this.toastService.toast$.subscribe((toast) => {
            this.toast = toast;
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
