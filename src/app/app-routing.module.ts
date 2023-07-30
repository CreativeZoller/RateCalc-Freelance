import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: LandingPageComponent,
        data: {
            pageTitle: environment.appTitle,
        },
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // only for debugging
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
