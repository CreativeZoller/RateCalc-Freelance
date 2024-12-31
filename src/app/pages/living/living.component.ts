/** 
  living component - the form values saved properly, but the select and input components should have proper values, if input value has value, show it in the input field, if select component has rate 1 show yearly, if select component has rate 12 show monthly, if select component has rate 365 show daily
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
    selector: 'app-living',
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
                                <h2 class="text-2xl font-bold text-gray-800">Living expenses</h2>

                                <div class="my-4" id="formgroup">
                                    <form class="space-y-4" [formGroup]="livingForm">
                                        <div class="flex gap-4 relative" formGroupName="rent">
                                            <app-input
                                                type="text"
                                                id="rent-value"
                                                size="two-third"
                                                label="Rent or mortgage"
                                                hint="How much for the roof over your head?"
                                                [control]="getControl('rent.value')">
                                            </app-input>
                                            <app-select id="rent-rate" size="one-third" label="Rate" [data]="rateOptions" [control]="getControl('rent.rate')">
                                            </app-select>
                                        </div>

                                        <div class="flex gap-4 relative" formGroupName="utilities">
                                            <app-input
                                                type="text"
                                                id="utilities-value"
                                                size="two-third"
                                                label="Utilities  ( Gas / Electric )"
                                                hint="Lights? Electricity? Heat? Stove?"
                                                [control]="getControl('utilities.value')">
                                            </app-input>
                                            <app-select
                                                id="utilities-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('utilities.rate')">
                                            </app-select>
                                        </div>

                                        <div class="flex gap-4 relative" formGroupName="communication">
                                            <app-input
                                                type="text"
                                                id="communication-value"
                                                size="two-third"
                                                label="Phone & Internet"
                                                hint="Cell phone bill? Cable? Internet? Landline?"
                                                [control]="getControl('communication.value')">
                                            </app-input>
                                            <app-select
                                                id="communication-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('communication.rate')">
                                            </app-select>
                                        </div>

                                        <div class="flex gap-4 relative" formGroupName="meals">
                                            <app-input
                                                type="text"
                                                id="meals-value"
                                                size="two-third"
                                                label="Meals & Entertainment"
                                                hint="Groceries? Takeout? Dinner with friends?"
                                                [control]="getControl('meals.value')">
                                            </app-input>
                                            <app-select id="meals-rate" size="one-third" label="Rate" [data]="rateOptions" [control]="getControl('meals.rate')">
                                            </app-select>
                                        </div>

                                        <div class="flex gap-4 relative" formGroupName="insurance">
                                            <app-input
                                                type="text"
                                                id="insurance-value"
                                                size="two-third"
                                                label="Insurance  ( Health / Other )"
                                                hint="Health / Dental / Vision / Life insurance? Car insurance?"
                                                [control]="getControl('insurance.value')">
                                            </app-input>
                                            <app-select
                                                id="insurance-rate"
                                                size="one-third"
                                                label="Rate"
                                                [data]="rateOptions"
                                                [control]="getControl('insurance.rate')">
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
export class LivingComponent implements OnInit, OnDestroy {
    // general page settings
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    progressValue = '0';
    numberOfSteps = 6;
    paragraphs = [
        { content: 'These are the essential expenses that you will need to cover in order to sustain your current lifestyle.', modifier: 'normal' as const },
        { content: 'If you cannot afford these costs, you cannot be a full-time freelancer - sorry!', modifier: 'normal' as const },
    ];
    // form settings
    private formSubscription: Subscription | undefined;
    rateOptions: SelectData[] = [
        { label: 'Daily', value: '365' },
        { label: 'Monthly', value: '12' },
        { label: 'Yearly', value: '1' },
    ];
    livingForm = new FormGroup({
        rent: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        utilities: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        communication: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        meals: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        insurance: new FormGroup({
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
        this.subTitle = 'Living';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '1');
            this.progressValue = this.calculateProgress(step);
        });

        // Load saved form data if it exists
        const savedData = this.formSignalService.getFormData('living');
        if (savedData) {
            this.doTheLogging();
            this.livingForm.patchValue(savedData.controls, { emitEvent: false });
        }

        // Subscribe to form value changes
        this.formSubscription = this.livingForm.valueChanges.subscribe((values) => {
            this.formSignalService.updateFormData('living', values);
            this.calculationService.calculateTotals('living');
        });

        // Initialize form signal if no data exists
        if (!savedData) {
            this.formSignalService.createFormData('living', this.livingForm.value);
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    getControl(path: string): FormControl {
        return this.livingForm.get(path) as FormControl;
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
        // Log form data
        console.log('Form Values:', this.livingForm.value);
        // Log form signal data - the one we MUST use through the app
        console.log('Form Signal Data:', this.formSignalService.getFormData('living'));
        // Calculate and log totals
        const totals = this.calculationService.calculateTotals('living');
        console.log('Calculated Totals:', totals);
        // Calculate and log yearly total
        const yearlyTotal = this.calculationService.convertToYearlyTotal(totals);
        console.log('Total Yearly Amount:', yearlyTotal);
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/landing']);
        } else if (direction === 'next') {
            //this.doTheLogging();
            this.router.navigate(['/travel'], { queryParams: { step: '2' } });
        }
    }
}
