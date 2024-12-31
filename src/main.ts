import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app/app.routes';
import { LoadingComponent } from '@components/loading/loading.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LoadingComponent],
    template: ` <router-outlet></router-outlet> `,
})
export class App {}

bootstrapApplication(App, {
    providers: [provideRouter(routes, withDebugTracing())],
});
