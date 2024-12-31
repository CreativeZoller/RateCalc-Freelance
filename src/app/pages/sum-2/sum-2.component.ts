import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent, ListGroupComponent, TabsComponent, TabPanelComponent, TableComponent, DialogComponent } from '@components/index';
import { InputComponent, SelectComponent } from '@components/form-elements/index';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSignalService } from '@services/form-signal.service';
import { ExpenseCalculationService } from '@services/expense-calculation.service';
import { FeeCalculationService } from '@services/fee-calculation.service';
import { CurrencyConverterPipe } from '@pipes/index';

interface ListItem {
    content: string;
}

interface FormControls {
    [key: string]: any;
}

interface FormData {
    formId: string;
    controls: FormControls;
}

interface FeesTotals {
    creditCardTotal: number;
    serviceTotal: number;
    otherTotal: number;
    total: number;
}

@Component({
    selector: 'app-sum-2',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        PageLayoutComponent,
        ButtonComponent,
        StatusBarComponent,
        InputComponent,
        SelectComponent,
        TabsComponent,
        TabPanelComponent,
        ListGroupComponent,
        TableComponent,
        DialogComponent,
        ReactiveFormsModule,
        CurrencyConverterPipe,
    ],
    template: `
        <app-page-layout
            [title]="title"
            [subTitle]="subTitle"
            [appName]="appName"
            [stepNumber]="'03'"
            [showSimplifiedState]="true"
            [showTabState]="true"
            [bgColor]="bgColor">
            <div tabContent>
                <app-tabs [orientation]="'horizontal'" [tabTriggers]="['Fees', 'Taxes']" [bgColor]="bgColor">
                    <app-tab-panel>
                        <div scrollContent>
                            <app-list-group [type]="'normal'" [items]="feesListItems" [bgColor]="bgColor" class="mt-6"> </app-list-group>
                        </div>
                    </app-tab-panel>
                    <app-tab-panel>
                        <div scrollContent>
                            <app-list-group [type]="'normal'" [items]="taxesListItems" [bgColor]="bgColor" class="mt-6"> </app-list-group>
                        </div>
                    </app-tab-panel>
                </app-tabs>
            </div>

            <div rightContent class="flex flex-col space-y-8 w-full h-full">
                <app-status-bar length="100%" [value]="progressValue" [numOfSteps]="numberOfSteps" [showProgress]="true"> </app-status-bar>

                <div class="flex-1 flex flex-col">
                    <div class="flex flex-col h-full">
                        <div class="flex-1 max-h-[90%]">
                            <div
                                class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 active:scrollbar-thumb-slate-400">
                                <div class="space-y-4">
                                    <h2 class="text-2xl font-bold text-gray-800">Total breakdown</h2>

                                    <div class="my-4">
                                        <app-table
                                            [tableHeader]="tableHeaders"
                                            [tableContent]="getTableContent()"
                                            [tableClasses]="['standard-sum']"
                                            [bgColor]="tableBgColor">
                                        </app-table>

                                        <p class="text-gray-600 max-w-md my-6">
                                            Your total annual expenses:
                                            <span class="font-bold text-blue-base">{{ totalAnnualExpenses | currencyConverter: 'eur' : false }}</span>
                                        </p>

                                        <p class="text-gray-600 max-w-md mb-4">
                                            So, you need {{ totalAnnualExpenses | currencyConverter: 'eur' : false }} to break even?
                                            <app-button variant="primary" fontWeight="semibold" isLink="yes" (onClick)="showFormulaInfoDialog = true">
                                                Show the answer
                                            </app-button>
                                        </p>
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
            </div>
        </app-page-layout>

        <app-dialog [(isOpen)]="showFormulaInfoDialog" [size]="'normal'" [header]="{ title: 'How to break even' }">
            <div dialogContent class="space-y-4">
                <p class="text-gray-700">You need to earn enough to pay for all annual expenses AFTER fees and taxes are paid.</p>
                <p class="text-gray-700">The "Break Even Formula": <span class="text-blue-base font-semibold">Expenses + Fees + Taxes = Break even</span></p>
            </div>
        </app-dialog>
    `,
})
export class Sum2Component implements OnInit {
    title = '';
    subTitle = '';
    appName = '';
    bgColor: BackgroundColor = 'gray';
    tableBgColor: BackgroundColor = 'gray';
    showFormulaInfoDialog = false;
    progressValue = '3';
    numberOfSteps = 3;

    // Total annual expenses from phase 1
    totalAnnualExpenses = 0;

    // Fees and taxes totals
    totalFees = 0;
    totalTaxes = 0;

    // List items with totals
    get feesListItems(): ListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [
            { content: `Credit Card Fees (${pipe.transform(this.creditCardFees, 'eur')})` },
            { content: `Service Fees (${pipe.transform(this.serviceFees, 'eur')})` },
            { content: `Other Fees (${pipe.transform(this.otherFees, 'eur')})` },
        ];
    }

    get taxesListItems(): ListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [{ content: `Federal Tax (${pipe.transform(this.federalTax, 'eur')})` }, { content: `State Tax (${pipe.transform(this.stateTax, 'eur')})` }];
    }

    // Fees breakdown
    creditCardFees = 0;
    serviceFees = 0;
    otherFees = 0;

    // Tax breakdown
    federalTax = 0;
    stateTax = 0;

    // table settings
    tableHeaders: string[] = ['Expenses', 'Fees', 'Taxes'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private formSignalService: FormSignalService,
        private calculationService: ExpenseCalculationService,
        private feeCalculationService: FeeCalculationService
    ) {}

    ngOnInit(): void {
        this.title = 'Fees and Taxes';
        this.subTitle = 'Total Annual Sales';
        this.appName = this.configService.appTitle;
        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '3', 10);
            this.progressValue = this.calculateProgress(step);
        });

        this.calculateTotals();
    }

    private calculateTotals(): void {
        // Get total annual expenses from phase 1
        const phase1Forms = ['living', 'travel', 'business1', 'business2', 'business3'];
        this.totalAnnualExpenses = phase1Forms.reduce((total, formId) => {
            const formData: FormData | undefined = this.formSignalService.getFormData(formId);
            if (formData) {
                const totals = this.calculationService.calculateTotals(formId);
                return total + this.calculationService.convertToYearlyTotal(totals);
            }
            return total;
        }, 0);

        // Get fees data
        const feesData: FormData | undefined = this.formSignalService.getFormData('fees');
        if (feesData) {
            const feesTotals: FeesTotals = this.feeCalculationService.calculateFees('fees');
            this.creditCardFees = feesTotals.creditCardTotal;
            this.serviceFees = feesTotals.serviceTotal;
            this.otherFees = feesTotals.otherTotal;
            this.totalFees = feesTotals.total;
        }

        // Get taxes data
        const taxesData: FormData | undefined = this.formSignalService.getFormData('taxes');
        if (taxesData && taxesData.controls) {
            const isSingle: boolean = taxesData.controls['isSingle'];
            // Calculate taxes based on filing status
            this.federalTax = this.calculateFederalTax(this.totalAnnualExpenses, isSingle);
            this.stateTax = this.calculateStateTax(this.totalAnnualExpenses);
            this.totalTaxes = this.federalTax + this.stateTax;
        }
    }

    private calculateFederalTax(income: number, isSingle: boolean): number {
        // TODO: Simplified tax calculation - this should be replaced with actual tax brackets
        const taxRate = isSingle ? 0.24 : 0.22; // Example rates
        return income * taxRate;
    }

    private calculateStateTax(income: number): number {
        // TODO: Simplified state tax calculation
        const stateRate = 0.05; // Example rate
        return income * stateRate;
    }

    private updateProgress(): void {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '3', 10);
        this.progressValue = this.calculateProgress(step);
    }

    private calculateProgress(step: number): string {
        if (step === 1) return '0';
        if (step === this.numberOfSteps) return '100';

        const stepPercentage = 100 / (this.numberOfSteps - 1);
        return ((step - 1) * stepPercentage).toString();
    }

    getTableContent(): string[][] {
        const pipe = new CurrencyConverterPipe();
        return [
            ['Annual Expenses', pipe.transform(this.totalAnnualExpenses, 'eur'), ''],
            ['Total Fees', pipe.transform(this.totalFees, 'eur'), ''],
            ['Total Taxes', pipe.transform(this.totalTaxes, 'eur'), ''],
        ];
    }

    public doTheLogging() {
        const pipe = new CurrencyConverterPipe();

        console.log('Total Annual Expenses:', {
            amount: this.totalAnnualExpenses,
            formatted: pipe.transform(this.totalAnnualExpenses, 'eur'),
        });

        console.log('Fees Breakdown:', {
            creditCard: {
                amount: this.creditCardFees,
                formatted: pipe.transform(this.creditCardFees, 'eur'),
            },
            service: {
                amount: this.serviceFees,
                formatted: pipe.transform(this.serviceFees, 'eur'),
            },
            other: {
                amount: this.otherFees,
                formatted: pipe.transform(this.otherFees, 'eur'),
            },
            total: {
                amount: this.totalFees,
                formatted: pipe.transform(this.totalFees, 'eur'),
            },
        });

        console.log('Taxes Breakdown:', {
            federal: {
                amount: this.federalTax,
                formatted: pipe.transform(this.federalTax, 'eur'),
            },
            state: {
                amount: this.stateTax,
                formatted: pipe.transform(this.stateTax, 'eur'),
            },
            total: {
                amount: this.totalTaxes,
                formatted: pipe.transform(this.totalTaxes, 'eur'),
            },
        });

        console.log('Grand Total:', {
            amount: this.totalAnnualExpenses + this.totalFees + this.totalTaxes,
            formatted: pipe.transform(this.totalAnnualExpenses + this.totalFees + this.totalTaxes, 'eur'),
        });
    }

    navigate(direction: 'back' | 'next'): void {
        if (direction === 'back') {
            this.router.navigate(['/taxes'], { queryParams: { step: '2' } });
        } else {
            this.doTheLogging();
        }
    }
}
