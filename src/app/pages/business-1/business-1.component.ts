/** 
  business-1 component - the form values saved properly, but the select and input components should have proper values, if input value has value, show it in the input field, if select component has rate 1 show yearly, if select component has rate 12 show monthly, if select component has rate 365 show daily
**/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor, styleConfigs } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent } from '@components/index';
import { InputComponent, SelectComponent } from '@components/form-elements/index';
import { SelectData } from '@components/form-elements/select/select.types';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSignalService } from '@services/form-signal.service';
import { ExpenseCalculationService } from '@services/expense-calculation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-business-1',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PageLayoutComponent, ButtonComponent, StatusBarComponent, InputComponent, SelectComponent, ReactiveFormsModule],
    template: `
        <app-page-layout
            [title]="title"
            [subTitle]="subTitle"
            [appName]="appName"
            [stepNumber]="'02'"
            [showSimplifiedState]="true"
            [paragraphs]="paragraphs"
            [bgColor]="bgColor">
            <div rightContent class="flex flex-col space-y-8 w-full h-full">
                <app-status-bar length="100%" [value]="progressValue" [numOfSteps]="numberOfSteps" [showProgress]="true"> </app-status-bar>

                <!-- Main content container with flex-1 to take remaining height -->
                <div class="flex-1 min-h-0 flex flex-col">
                    <!-- Content wrapper with full height and overflow handling -->
                    <div class="flex-1 overflow-hidden">
                        <!-- Scrollable area -->
                        <div
                            class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 active:scrollbar-thumb-slate-400">
                            <div class="space-y-4">
                                <h2 class="text-2xl font-bold text-gray-800">Essential business expenses</h2>

                                <div class="my-4" id="formgroup">
                                    <form class="space-y-4" [formGroup]="business1Form">
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-supplies-value"
                                                size="two-third"
                                                label="Office Supplies"
                                                hint="Pens, paper, ink? Work stations or small office furniture?"
                                                [control]="getControl('supplies.value')">
                                            </app-input>
                                            <app-select
                                                id="business-supplies-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('supplies.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-hands-value"
                                                size="two-third"
                                                label="Hardware & Software"
                                                hint="New computer? Monitors? 1-time software purchases?"
                                                [control]="getControl('hands.value')">
                                            </app-input>
                                            <app-select
                                                id="business-hands-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('hands.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-assets-value"
                                                size="two-third"
                                                label="Trade Assets"
                                                hint="Fonts? Icons? Books? Plug-ins?"
                                                [control]="getControl('assets.value')">
                                            </app-input>
                                            <app-select
                                                id="business-assets-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('assets.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-subs-value"
                                                size="two-third"
                                                label="Subscriptions"
                                                hint="Adobe Creative Cloud? Sketch? InVision? Pro Tools?"
                                                [control]="getControl('subs.value')">
                                            </app-input>
                                            <app-select
                                                id="living-subs-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('subs.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-web-value"
                                                size="two-third"
                                                label="Website"
                                                hint="Hosting? Servers? Cloud? Domain registrations?"
                                                [control]="getControl('web.value')">
                                            </app-input>
                                            <app-select
                                                id="business-web-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('web.rate')">
                                            </app-select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation buttons at the bottom -->
                    <div class="flex-none flex justify-between mt-6">
                        <app-button variant="secondary" fontWeight="semibold" outlined="yes" (onClick)="navigate('back')"> Back </app-button>

                        <app-button variant="primary" fontWeight="semibold" (onClick)="navigate('next')"> Next </app-button>
                    </div>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class Business1Component implements OnInit, OnDestroy {
    // general page settings
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    progressValue = '3';
    numberOfSteps = 6;
    paragraphs = [
        {
            content: 'These are your core business expenses.',
            modifier: 'normal' as const,
        },
        {
            content:
                'Ex. If you need a computer every three years, then consider taking the full cost and dividing it by 3, then placing the amount in the "Yearly" column.',
            modifier: 'normal' as const,
        },
    ];
    // form settings
    private formSubscription: Subscription | undefined;
    rateOptions: SelectData[] = [
        { label: 'Daily', value: '365' },
        { label: 'Monthly', value: '12' },
        { label: 'Yearly', value: '1' },
    ];
    business1Form = new FormGroup({
        supplies: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        hands: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        assets: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        subs: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        web: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
    });

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private formSignalService: FormSignalService,
        private calculationService: ExpenseCalculationService
    ) {}

    ngOnInit() {
        this.title = 'Annual Expenses';
        this.subTitle = 'Business 1';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '3');
            this.progressValue = this.calculateProgress(step);
        });

        // Load saved form data if it exists
        const savedData = this.formSignalService.getFormData('business1');
        if (savedData) {
            this.doTheLogging();
            this.business1Form.patchValue(savedData.controls, { emitEvent: false });
        }

        // Subscribe to form value changes
        this.formSubscription = this.business1Form.valueChanges.subscribe((values) => {
            this.formSignalService.updateFormData('business1', values);
            this.calculationService.calculateTotals('business1');
        });

        // Initialize form signal if no data exists
        if (!savedData) {
            this.formSignalService.createFormData('business1', this.business1Form.value);
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    getControl(path: string): FormControl {
        return this.business1Form.get(path) as FormControl;
    }

    private updateProgress() {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '3');
        this.progressValue = this.calculateProgress(step);
    }

    private calculateProgress(step: number): string {
        // For N steps, we need N-1 intervals (0% to 100%)
        if (step === 1) return '0';
        if (step === this.numberOfSteps) return '100';

        // (step - 1) because first step is 0%
        // 100/(numberOfSteps-1) gives us the percentage increment per step
        const stepPercentage = 100 / (this.numberOfSteps - 1);
        return ((step - 1) * stepPercentage).toString();
    }

    public doTheLogging() {
        console.clear();
        // Log form data
        console.log('Form Values:', this.business1Form.value);
        // Log form signal data - the one we MUST use through the app
        console.log('Form Signal Data:', this.formSignalService.getFormData('business1'));
        // Calculate and log totals
        const totals = this.calculationService.calculateTotals('business1');
        console.log('Calculated Totals:', totals);
        // Calculate and log yearly total
        const yearlyTotal = this.calculationService.convertToYearlyTotal(totals);
        console.log('Total Yearly Amount:', yearlyTotal);
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/travel'], { queryParams: { step: '2' } });
        } else if (direction === 'next') {
            //this.doTheLogging();
            this.router.navigate(['/business-2'], { queryParams: { step: '4' } });
        }
    }
}
