import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
    title: string;
    description: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastSubject = new BehaviorSubject<Toast | null>(null);
    toast$: Observable<Toast | null> = this.toastSubject.asObservable();
    private timeoutId: any;

    show(toast: Toast) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.toastSubject.next(toast);

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
