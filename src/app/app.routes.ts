import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
    // todo: https://angular.dev/guide/incremental-hydration
    // todo: remove all test page components

    // 04 working days
    //      days on
    //      days off
    //      minimum rates
    // 05 savings - kek
    //      savings
    //      new rates
    // 06 summary - szurke / kek
    // 42 404 - szurke

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
        children: [],
    },
    {
        path: 'travel',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/travel/travel.component').then((m) => m.TravelComponent),
        children: [],
    },
    {
        path: 'business-1',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/business-1/business-1.component').then((m) => m.Business1Component),
        children: [],
    },
    {
        path: 'business-2',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/business-2/business-2.component').then((m) => m.Business2Component),
        children: [],
    },
    {
        path: 'business-3',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/business-3/business-3.component').then((m) => m.Business3Component),
        children: [],
    },
    {
        path: 'break-even-1',
        title: 'Annual Expenses',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/sum-1/sum-1.component').then((m) => m.Sum1Component),
        children: [],
    },
    {
        path: 'fees',
        title: 'Sales Fees and Taxes',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/fees/fees.component').then((m) => m.FeesComponent),
        children: [],
    },
    {
        path: 'taxes',
        title: 'Sales Fees and Taxes',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/taxes/taxes.component').then((m) => m.TaxesComponent),
        children: [],
    },
    {
        path: 'break-even-2',
        title: 'Sales Fees and Taxes',
        data: {
            apptitle: environment.appTitle,
        },
        loadComponent: () => import('./pages/sum-2/sum-2.component').then((m) => m.Sum2Component),
        children: [],
    },
    //
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
