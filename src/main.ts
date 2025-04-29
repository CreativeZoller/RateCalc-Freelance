import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideRouter, withDebugTracing } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { LoadingComponent } from '@components/loading/loading.component';
import { ToastComponent } from '@components/toast/toast.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LoadingComponent, ToastComponent],
    template: ` <router-outlet></router-outlet><app-toast></app-toast> `,
})
export class App {}

bootstrapApplication(App, {
    providers: [provideRouter(routes), provideHttpClient()],
});
