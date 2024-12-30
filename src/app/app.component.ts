import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ToastComponent],
    template: `
        <router-outlet></router-outlet>
        <app-toast></app-toast>
    `,
})
export class AppComponent {}
