/** 
  business-3 component - the form values saved properly, but the select and input components should have proper values, if input value has value, show it in the input field, if select component has rate 1 show yearly, if select component has rate 12 show monthly, if select component has rate 365 show daily
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
    selector: 'app-business-3',
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
                                <h2 class="text-2xl font-bold text-gray-800">Additional business expenses</h2>

                                <div class="my-4" id="formgroup">
                                    <form class="space-y-4" [formGroup]="business3Form">
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-office-value"
                                                size="two-third"
                                                label="Office Space"
                                                hint="Co-working space? Dedicated office?"
                                                [control]="getControl('office.value')">
                                            </app-input>
                                            <app-select
                                                id="business-office-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('office.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="office-help-value"
                                                size="two-third"
                                                label="Contractors & Hired Help"
                                                hint="Need to hire some help on projects? Any additional help?"
                                                [control]="getControl('help.value')">
                                            </app-input>
                                            <app-select
                                                id="living-help-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('help.rate')">
                                            </app-select>
                                        </div>
                                        <div class="flex gap-4 relative">
                                            <app-input
                                                type="text"
                                                id="business-other-value"
                                                size="two-third"
                                                label="Other"
                                                hint="Business insurance? Business entity fees? Other expenses?"
                                                [control]="getControl('other.value')">
                                            </app-input>
                                            <app-select
                                                id="business-other-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('other.rate')">
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
export class Business3Component implements OnInit, OnDestroy {
    // general page settings
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    progressValue = '5';
    numberOfSteps = 6;
    paragraphs = [
        {
            content: 'Once you are established, these additional expenses could be part of your financial planning.',
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
    business3Form = new FormGroup({
        office: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        help: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        other: new FormGroup({
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
        this.subTitle = 'Business 3';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '5');
            this.progressValue = this.calculateProgress(step);
        });

        // Load saved form data if it exists
        const savedData = this.formSignalService.getFormData('business3');
        if (savedData) {
            this.doTheLogging();
            this.business3Form.patchValue(savedData.controls, { emitEvent: false });
        }

        // Subscribe to form value changes
        this.formSubscription = this.business3Form.valueChanges.subscribe((values) => {
            this.formSignalService.updateFormData('business3', values);
            this.calculationService.calculateTotals('business3');
        });

        // Initialize form signal if no data exists
        if (!savedData) {
            this.formSignalService.createFormData('business3', this.business3Form.value);
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    getControl(path: string): FormControl {
        return this.business3Form.get(path) as FormControl;
    }

    private updateProgress() {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '5');
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
        console.log('Form Values:', this.business3Form.value);
        // Log form signal data - the one we MUST use through the app
        console.log('Form Signal Data:', this.formSignalService.getFormData('business3'));
        // Calculate and log totals
        const totals = this.calculationService.calculateTotals('business3');
        console.log('Calculated Totals:', totals);
        // Calculate and log yearly total
        const yearlyTotal = this.calculationService.convertToYearlyTotal(totals);
        console.log('Total Yearly Amount:', yearlyTotal);
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/business-2'], { queryParams: { step: '4' } });
        } else if (direction === 'next') {
            //this.doTheLogging();
            this.router.navigate(['/break-even-1'], { queryParams: { step: '6' } });
        }
    }
}
