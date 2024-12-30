import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent } from '@components/button/button.component';
import { TooltipComponent } from '@components/tooltip/tooltip.component';
import { ConfigService } from '@services/config.service';
import { styleConfigs } from '@layout/page-layout.types';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, TooltipComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'01'" [bgColor]="bgColor">
            <div rightContent>
                <hgroup class="text-left mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-8">{{ appSlogan }}</h2>

                    <p class="text-gray-600 max-w-md mb-6">How much do you need to charge to sustain your freelance business?</p>

                    <app-tooltip [tooltipContent]="'Start calculate the hourly rate on which you can feel satisfied with doing what you love for living.'">
                        <p class="text-slate-900 font-bold max-w-md">Take 10 minutes and figure out your hourly / daily / weekly rate.</p>
                    </app-tooltip>
                </hgroup>

                <div class="flex flex-col items-left">
                    <app-button variant="primary" (onClick)="navigateToCalculations()"> Start calculation </app-button>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class LandingComponent implements OnInit {
    title: string = '';
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
        this.appName = this.configService.appTitle;
        this.appSlogan = this.configService.appSlogan;
    }

    navigateToCalculations() {
        this.router.navigate(['/calculations']);
    }
}
