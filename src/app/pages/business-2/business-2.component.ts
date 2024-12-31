/** 
  business-2 component - the form values saved properly, but the select and input components should have proper values, if input value has value, show it in the input field, if select component has rate 1 show yearly, if select component has rate 12 show monthly, if select component has rate 365 show daily
  fix: with daily rate, value gets overwritten and rate gets empty
  fix: with yearly rate, value gets overwritten and rate gets empty
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
    selector: 'app-business-2',
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
                                <h2 class="text-2xl font-bold text-gray-800">Optional business expenses</h2>

                                <div class="my-4" id="formgroup">
                                    <form class="space-y-4" [formGroup]="business2Form">
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-ads-value"
                                                size="two-third"
                                                label="Advertising"
                                                hint="Google Ads? Print or online ads? Facebook? Instagram?"
                                                [control]="getControl('ads.value')">
                                            </app-input>
                                            <app-select
                                                id="business-ads-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('ads.value')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-legal-value"
                                                size="two-third"
                                                label="Legal & Accounting"
                                                hint="Contracts? Taxes? Accounting? Legal advice?"
                                                [control]="getControl('legal.value')">
                                            </app-input>
                                            <app-select
                                                id="business-legal-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('legal.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-self-value"
                                                size="two-third"
                                                label="Professional Development"
                                                hint="Tuition? Professional classes? Networking events?"
                                                [control]="getControl('self.value')">
                                            </app-input>
                                            <app-select
                                                id="business-self-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('self.value')">
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
export class Business2Component implements OnInit, OnDestroy {
    // general page settings
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    progressValue = '4';
    numberOfSteps = 6;
    paragraphs = [
        {
            content: 'These can be considered optional if you are just getting started.',
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
    business2Form = new FormGroup({
        ads: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        legal: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        self: new FormGroup({
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
        this.subTitle = 'Business 2';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '4');
            this.progressValue = this.calculateProgress(step);
        });

        // Load saved form data if it exists
        const savedData = this.formSignalService.getFormData('business2');
        if (savedData) {
            this.doTheLogging();
            this.business2Form.patchValue(savedData.controls, { emitEvent: false });
        }

        // Subscribe to form value changes
        this.formSubscription = this.business2Form.valueChanges.subscribe((values) => {
            this.formSignalService.updateFormData('business2', values);
            this.calculationService.calculateTotals('business2');
        });

        // Initialize form signal if no data exists
        if (!savedData) {
            this.formSignalService.createFormData('business2', this.business2Form.value);
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    getControl(path: string): FormControl {
        return this.business2Form.get(path) as FormControl;
    }

    private updateProgress() {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '4');
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
        console.log('Form Values:', this.business2Form.value);
        // Log form signal data - the one we MUST use through the app
        console.log('Form Signal Data:', this.formSignalService.getFormData('business2'));
        // Calculate and log totals
        const totals = this.calculationService.calculateTotals('business2');
        console.log('Calculated Totals:', totals);
        // Calculate and log yearly total
        const yearlyTotal = this.calculationService.convertToYearlyTotal(totals);
        console.log('Total Yearly Amount:', yearlyTotal);
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/business-1'], { queryParams: { step: '3' } });
        } else if (direction === 'next') {
            //this.doTheLogging();
            this.router.navigate(['/business-3'], { queryParams: { step: '5' } });
        }
    }
}
