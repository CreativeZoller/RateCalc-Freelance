/** 
  taxes component - the form values not always saved properly, but the toggle component should have proper values, if it is ture, show it toggled, if false, show untoggled
  fix: with the toggle, it is usually saves an Event instead of value
**/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent } from '@components/index';
import { InputComponent, SelectComponent, ToggleComponent } from '@components/form-elements/index';
import { SelectData } from '@components/form-elements/select/select.types';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSignalService } from '@services/form-signal.service';
import { ExpenseCalculationService } from '@services/expense-calculation.service';
import { FeeCalculationService } from '@services/fee-calculation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-taxes',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        PageLayoutComponent,
        ButtonComponent,
        StatusBarComponent,
        InputComponent,
        SelectComponent,
        ReactiveFormsModule,
        ToggleComponent,
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
                                <h2 class="text-2xl font-bold text-gray-800">Sales taxes</h2>

                                <div class="my-4" id="formgroup">
                                    <form [formGroup]="salesTaxesForm">
                                        <p class="text-xs text-gray-base font-normal mt-1 mb-2 block">Are you a Single earner?</p>

                                        <div class="space-y-4">
                                            <app-toggle value="isSingle" kind="double" [formControl]="getControl('isSingle')"> </app-toggle>
                                        </div>
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
export class TaxesComponent implements OnInit, OnDestroy {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'blue';
    progressValue = '2';
    numberOfSteps = 3;
    paragraphs = [
        { content: 'How are you filing taxes?', modifier: 'normal' as const },
        { content: 'Select "Yes" for Sole Proprietorship or Single-Member LLC, and "No" for Married Filing Separately.', modifier: 'normal' as const },
    ];

    private formSubscription: Subscription | undefined;

    salesTaxesForm = new FormGroup({
        isSingle: new FormControl(false),
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
        this.subTitle = 'Sales taxes';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '2');
            this.progressValue = this.calculateProgress(step);
        });

        // Load saved form data if it exists
        const savedData = this.formSignalService.getFormData('taxes');
        if (savedData && savedData.controls) {
            this.doTheLogging();
            // ??
            this.salesTaxesForm.patchValue(
                {
                    isSingle: savedData.controls['isSingle'],
                },
                { emitEvent: false }
            );
        }

        // Subscribe to form value changes
        this.formSubscription = this.salesTaxesForm.valueChanges.subscribe((values) => {
            this.formSignalService.updateFormData('taxes', values);
        });

        // Initialize form signal if no data exists
        if (!savedData) {
            this.formSignalService.createFormData('taxes', this.salesTaxesForm.value);
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    getControl(path: string): FormControl {
        return this.salesTaxesForm.get(path) as FormControl;
    }

    private updateProgress() {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '2');
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
        console.log('Form Values:', this.salesTaxesForm.value);
        console.log('Form Signal Data:', this.formSignalService.getFormData('taxes'));
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/fees'], { queryParams: { step: '1' } });
        } else if (direction === 'next') {
            this.formSignalService.updateFormData('taxes', this.salesTaxesForm.value);
            this.doTheLogging();
            //this.router.navigate(['/break-even-2'], { queryParams: { step: '3' } });
        }
    }
}
