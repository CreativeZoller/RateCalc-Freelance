import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from './toast.types';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastSubject = new BehaviorSubject<Toast | null>(null);
    toast$: Observable<Toast | null> = this.toastSubject.asObservable();
    private timeoutId: any;

    show(toast: Toast) {
        // Clear any existing timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        // Show the new toast
        this.toastSubject.next(toast);

        // Auto-hide after 5 seconds
        this.timeoutId = setTimeout(() => {
            this.hide();
        }, 5000);
    }

    hide() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.toastSubject.next(null);
    }
}
