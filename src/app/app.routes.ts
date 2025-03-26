import { Routes } from '@angular/router';
import { environment } from '@env/environment';

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
        path: 'living',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/living/living.component').then((m) => m.LivingComponent),
    },
    {
        path: 'travel',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/travel/travel.component').then((m) => m.TravelComponent),
    },
    {
        path: 'business-1',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/business-1/business-1.component').then((m) => m.Business1Component),
    },
    {
        path: 'business-2',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/business-2/business-2.component').then((m) => m.Business2Component),
    },
    {
        path: 'business-3',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/business-3/business-3.component').then((m) => m.Business3Component),
    },
    {
        path: 'break-even',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/sum-1/sum-1.component').then((m) => m.Sum1Component),
    },

    {
        path: 'holidays',
        title: 'Working Time',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/holidays/holidays.component').then((m) => m.WorkOffComponent),
    },
    {
        path: 'workdays',
        title: 'Working Time',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/workdays/workdays.component').then((m) => m.WorkOnComponent),
    },
    {
        path: 'minimum-rates',
        title: 'Working time',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/sum-2/sum-2.component').then((m) => m.Sum2Component),
    },
    {
        path: 'information',
        title: 'Get Involved',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/information/information.component').then((m) => m.InformationComponent),
    },
    {
        path: '**',
        title: 'Page not found',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/error/error.component').then((m) => m.ErrorComponent),
    },
];
