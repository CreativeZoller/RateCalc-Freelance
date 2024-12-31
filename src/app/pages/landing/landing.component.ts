import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ConfigService } from '@services/config.service';
import { styleConfigs } from '@layout/page-layout.types';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, TooltipComponent } from '@components/index';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, TooltipComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'01'" [subTitle]="subTitle" [bgColor]="bgColor">
            <div rightContent class="h-full w-full">
                <hgroup class="text-left mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-8">{{ appSlogan }}</h2>

                    <p class="text-gray-600 max-w-md mt-12 mb-12">
                        In just a few minutes, our intuitive calculator helps you determine the ideal hourly, daily, and weekly rates for your services. Simply
                        input your expenses, desired income goals, and your ideal lifestyle – whether it's financial freedom, early retirement, or simply a
                        comfortable living – and our powerful tool does the rest.
                    </p>

                    <app-tooltip [tooltipContent]="'Start calculate the hourly rate on which you can feel satisfied with doing what you love for living.'">
                        <p class="text-slate-900 font-semibold max-w-md">Take 10 minutes and figure out your hourly / daily / weekly rate.</p>
                    </app-tooltip>
                </hgroup>

                <div class="flex flex-col items-left">
                    <app-button variant="primary" fontWeight="semibold" (onClick)="navigateToCalculations()"> Start calculation </app-button>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class LandingComponent implements OnInit {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    appSlogan: string = '';
    bgColor: BackgroundColor = 'blue';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        this.title = this.route.snapshot.title as string;
        this.subTitle = 'Fee Calculator';
        this.appName = this.configService.appTitle;
        this.appSlogan = this.configService.appSlogan;
    }

    navigateToCalculations() {
        this.router.navigate(['/living']);
    }
}
