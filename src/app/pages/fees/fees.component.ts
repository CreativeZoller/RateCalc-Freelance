/** 
  fees component - the form values saved properly, but the select and input components should have proper values, if input value has value, show it in the input field, if select component has rate 1 show yearly, if select component has rate 12 show monthly, if select component has rate 365 show daily
  fix: with the calculated range slider,otherRange value is not set properly upon navigation, should recalculate immediately
  fix: with fee input fields, [object InputEvent] is visible instead of proper value
**/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent } from '@components/index';
import { InputComponent, SelectComponent, RangeComponent } from '@components/form-elements/index';
import { SelectData } from '@components/form-elements/select/select.types';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSignalService } from '@services/form-signal.service';
import { ExpenseCalculationService } from '@services/expense-calculation.service';
import { FeeCalculationService } from '@services/fee-calculation.service';
import { Subscription } from 'rxjs';

interface FeesFormControls {
    creditcardRange: number | null;
    serviceRange: number | null;
    otherRange: number | null;
    creditcardFee: string;
    serviceFee: string;
    otherFee: string;
}

@Component({
    selector: 'app-fees',
    standalone: true,
    imports: [
        CommonModule,
        AsyncPipe,
        RouterOutlet,
        PageLayoutComponent,
        ButtonComponent,
        StatusBarComponent,
        InputComponent,
        SelectComponent,
        ReactiveFormsModule,
        RangeComponent,
    ],
    template: `
        <app-page-layout
            [title]="title"
            [subTitle]="subTitle"
            [appName]="appName"
            [stepNumber]="'03'"
            [showSimplifiedState]="true"
            [paragraphs]="paragraphs"
            [bgColor]="bgColor">
            <div rightContent class="flex flex-col space-y-8 w-full h-full">
                <app-status-bar length="100%" [value]="progressValue" [numOfSteps]="numberOfSteps" [showProgress]="true"> </app-status-bar>

                <div class="flex-1 min-h-0 flex flex-col">
                    <div class="flex-1 overflow-hidden">
                        <div
                            class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 active:scrollbar-thumb-slate-400">
                            <div class="space-y-4">
                                <h2 class="text-2xl font-bold text-gray-800">Sales fees</h2>

                                <div class="my-4" id="formgroup">
                                    <form [formGroup]="salesFeesForm">
                                        <fieldset class="border border-solid border-gray-300 p-3 rounded-xl">
                                            <legend class="block text-sm font-medium text-gray-700 mb-1">% of Total Sales</legend>
                                            <p class="text-xs text-gray-base font-normal mt-1 mb-2 block">
                                                What percentages of your sales are from credit card / service / other?
                                            </p>
                                            <div class="flex flex-col gap-4">
                                                <app-range
                                                    caption="Credit Card"
                                                    [groupName]="'percentages'"
                                                    groupPosition="first"
                                                    [showLabels]="true"
                                                    [formControl]="getControl('creditcardRange')">
                                                </app-range>

                                                <app-range
                                                    caption="Service"
                                                    [groupName]="'percentages'"
                                                    groupPosition="second"
                                                    [showLabels]="true"
                                                    [formControl]="getControl('serviceRange')">
                                                </app-range>

                                                <app-range
                                                    caption="Other (Auto-calculated)"
                                                    [groupName]="'percentages'"
                                                    groupPosition="last"
                                                    [showLabels]="true"
                                                    [isDisabled]="true"
                                                    [formControl]="getControl('otherRange')">
                                                </app-range>
                                            </div>
                                        </fieldset>

                                        <fieldset class="border border-solid border-gray-300 mt-3 p-3 rounded-xl">
                                            <legend class="block text-sm font-medium text-gray-700 mb-1">Transaction fees %</legend>
                                            <p class="text-xs text-gray-base font-normal mt-1 mb-2 block">What is the sales fee, per sale? (0 - 100%)</p>
                                            <div class="flex gap-4 relative">
                                                <app-input
                                                    type="text"
                                                    id="creditcard-fee"
                                                    size="full"
                                                    label="Credit card"
                                                    [formControl]="getControl('creditcardFee')">
                                                </app-input>
                                                <app-input type="text" id="service-fee" size="full" label="Service" [formControl]="getControl('serviceFee')">
                                                </app-input>
                                                <app-input type="text" id="other-fee" size="full" label="Other" [formControl]="getControl('otherFee')">
                                                </app-input>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-none flex justify-between mt-6">
                        <app-button variant="secondary" fontWeight="semibold" outlined="yes" (onClick)="navigate('back')"> Back </app-button>

                        <app-button variant="primary" fontWeight="semibold" (onClick)="navigate('next')"> Next </app-button>
                    </div>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class FeesComponent implements OnInit, OnDestroy {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'blue';
    progressValue = '1';
    numberOfSteps = 3;
    paragraphs = [
        { content: "You can't escape them ¯\\_(ツ)_/¯", modifier: 'normal' as const },
        { content: 'Credit Card - Do you accept credit card payments?', modifier: 'normal' as const },
        { content: 'Service - Do you pay any third-party fees? (ex. sales commissions, Upwork)', modifier: 'normal' as const },
        { content: 'Other - All other sales that have a transaction fee. If none, enter 0%.', modifier: 'normal' as const },
    ];

    private formSubscription: Subscription | undefined;

    salesFeesForm = new FormGroup({
        creditcardRange: new FormControl<number>(0),
        serviceRange: new FormControl<number>(0),
        otherRange: new FormControl<number>(100),
        creditcardFee: new FormControl(''),
        serviceFee: new FormControl(''),
        otherFee: new FormControl(''),
    });

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private formSignalService: FormSignalService,
        private calculationService: ExpenseCalculationService,
        private feeCalculationService: FeeCalculationService
    ) {}

    ngOnInit() {
        this.title = 'Fees and Taxes';
        this.subTitle = 'Sales fees';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '1');
            this.progressValue = this.calculateProgress(step);
        });

        // Load saved form data if it exists
        const savedData = this.formSignalService.getFormData('fees');
        if (savedData && savedData.controls) {
            const controls = savedData.controls as FeesFormControls;

            // First set the range values to trigger recalculation
            if (controls.creditcardRange !== undefined || controls.serviceRange !== undefined) {
                this.salesFeesForm.patchValue(
                    {
                        creditcardRange: controls.creditcardRange ?? 0,
                        serviceRange: controls.serviceRange ?? 0,
                    },
                    { emitEvent: true }
                );
            }

            // Then set the fee values
            this.salesFeesForm.patchValue(
                {
                    creditcardFee: controls.creditcardFee || '',
                    serviceFee: controls.serviceFee || '',
                    otherFee: controls.otherFee || '',
                },
                { emitEvent: false }
            );
        }

        // Subscribe to form value changes
        this.formSubscription = this.salesFeesForm.valueChanges.subscribe((values) => {
            this.formSignalService.updateFormData('fees', values);
            this.feeCalculationService.calculateFees('fees');
        });

        // Initialize form signal if no data exists
        if (!savedData) {
            this.formSignalService.createFormData('fees', this.salesFeesForm.value);
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    getControl(path: string): FormControl {
        const control = this.salesFeesForm.get(path);
        if (!control) {
            throw new Error(`Control ${path} not found`);
        }
        return control as FormControl;
    }

    private updateProgress() {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '1');
        this.progressValue = this.calculateProgress(step);
    }

    private calculateProgress(step: number): string {
        if (step === 1) return '0';
        if (step === this.numberOfSteps) return '100';

        const stepPercentage = 100 / (this.numberOfSteps - 1);
        return ((step - 1) * stepPercentage).toString();
    }

    public doTheLogging() {
        console.clear();
        console.log('Form Values:', this.salesFeesForm.value);
        console.log('Form Signal Data:', this.formSignalService.getFormData('fees'));
        const feesTotals = this.feeCalculationService.calculateFees('fees');
        console.log('Calculated Fees:', {
            percentages: {
                creditCard: `${feesTotals.percentages.creditCard}%`,
                service: `${feesTotals.percentages.service}%`,
                other: `${feesTotals.percentages.other}%`,
            },
            fees: {
                creditCard: `${feesTotals.fees.creditCard}%`,
                service: `${feesTotals.fees.service}%`,
                other: `${feesTotals.fees.other}%`,
            },
            totals: {
                creditCard: feesTotals.creditCardTotal,
                service: feesTotals.serviceTotal,
                other: feesTotals.otherTotal,
                total: feesTotals.total,
            },
        });
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/break-even-1'], { queryParams: { step: '6' } });
        } else if (direction === 'next') {
            this.formSignalService.updateFormData('fees', this.salesFeesForm.value);
            //this.doTheLogging();
            this.router.navigate(['/taxes'], { queryParams: { step: '2' } });
        }
    }
}
