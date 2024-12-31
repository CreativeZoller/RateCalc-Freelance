import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    {
        path: 'landing',
        title: 'Landing',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/landing/landing.component').then((m) => m.LandingComponent),
    },
    {
        path: 'calculations',
        title: 'Calculations',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/calculations/calculations.component').then((m) => m.CalculationsComponent),
    },
    {
        path: 'scrolls',
        title: 'Scrolls',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/scroll-test/scroll-test.component').then((m) => m.ScrollTestComponent),
    },
    {
        path: 'tabs',
        title: 'Tabs',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/tab-test/tab-test.component').then((m) => m.TabTestComponent),
    },
    {
        path: 'table',
        title: 'Table',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/table-test/table-test.component').then((m) => m.TableTestComponent),
    },
    {
        path: '**',
        title: 'Error',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/error/error.component').then((m) => m.ErrorComponent),
    },
];
