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
import { CurrencyConverterPipe } from '@pipes/index';

interface ListItem {
    content: string;
}

@Component({
    selector: 'app-sum-1',
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
            [stepNumber]="'02'"
            [showSimplifiedState]="true"
            [showTabState]="true"
            [bgColor]="bgColor">
            <div tabContent>
                <app-tabs [orientation]="'horizontal'" [tabTriggers]="['Essential expenses', 'Non essential expenses']" [bgColor]="bgColor">
                    <app-tab-panel>
                        <div scrollContent>
                            <app-list-group [type]="'normal'" [items]="essentialListItems" [bgColor]="bgColor" class="mt-6"> </app-list-group>
                        </div>
                    </app-tab-panel>
                    <app-tab-panel>
                        <div scrollContent>
                            <app-list-group [type]="'normal'" [items]="optionalListItems" [bgColor]="bgColor" class="mt-6"> </app-list-group>
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
                                            <span class="font-bold text-blue-base">{{ phaseTotal | currencyConverter: 'eur' : false }}</span
                                            >, which is composed as follows:<br />
                                            <small
                                                >({{ phaseDailyTotal | currencyConverter: 'eur' : false }} * 365) + ({{
                                                    phaseMonthlyTotal | currencyConverter: 'eur' : false
                                                }}
                                                * 12) + ({{ phaseYearlyTotal | currencyConverter: 'eur' : false }} * 1)</small
                                            >
                                        </p>

                                        <p class="text-gray-600 max-w-md mb-4">
                                            So, you need {{ phaseTotal | currencyConverter: 'eur' : false }} to break even?
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
export class Sum1Component implements OnInit {
    title = '';
    subTitle = '';
    appName = '';
    bgColor: BackgroundColor = 'blue';
    tableBgColor: BackgroundColor = 'gray';
    showFormulaInfoDialog = false;
    progressValue = '6';
    numberOfSteps = 6;

    // Form totals
    livingTotal = 0;
    travelTotal = 0;
    business1Total = 0;
    business2Total = 0;
    business3Total = 0;

    // Phase totals
    phaseDailyTotal = 0;
    phaseMonthlyTotal = 0;
    phaseYearlyTotal = 0;
    phaseTotal = 0;

    // List items with totals
    get essentialListItems(): ListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [
            { content: `Living expenses (${pipe.transform(this.livingTotal, 'eur')})` },
            { content: `Travel expenses (${pipe.transform(this.travelTotal, 'eur')})` },
            { content: `Business 1 expenses (${pipe.transform(this.business1Total, 'eur')})` },
        ];
    }

    get optionalListItems(): ListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [
            { content: `Business 2 expenses (${pipe.transform(this.business2Total, 'eur')})` },
            { content: `Business 3 expenses (${pipe.transform(this.business3Total, 'eur')})` },
        ];
    }

    // table settings
    tableHeaders: string[] = ['Subtotal', 'Annual multiplier', 'Amount you spend'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private formSignalService: FormSignalService,
        private calculationService: ExpenseCalculationService
    ) {}

    ngOnInit(): void {
        this.title = 'Annual Expenses';
        this.subTitle = 'Annual Totals';
        this.appName = this.configService.appTitle;
        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '6', 10);
            this.progressValue = this.calculateProgress(step);
        });

        this.calculateFormTotals();
    }

    private calculateFormTotals(): void {
        const forms = ['living', 'travel', 'business1', 'business2', 'business3'];

        let totalDaily = 0;
        let totalMonthly = 0;
        let totalYearly = 0;

        forms.forEach((formId) => {
            const formData = this.formSignalService.getFormData(formId);
            if (formData) {
                const totals = this.calculationService.calculateTotals(formId);
                const yearlyTotal = this.calculationService.convertToYearlyTotal(totals);

                totalDaily += totals.dailyTotal;
                totalMonthly += totals.monthlyTotal;
                totalYearly += totals.yearlyTotal;
                //
                console.log(totals);
                //
                switch (formId) {
                    case 'living':
                        this.livingTotal = yearlyTotal;
                        break;
                    case 'travel':
                        this.travelTotal = yearlyTotal;
                        break;
                    case 'business1':
                        this.business1Total = yearlyTotal;
                        break;
                    case 'business2':
                        this.business2Total = yearlyTotal;
                        break;
                    case 'business3':
                        this.business3Total = yearlyTotal;
                        break;
                }
            }
        });

        this.phaseDailyTotal = totalDaily;
        this.phaseMonthlyTotal = totalMonthly;
        this.phaseYearlyTotal = totalYearly;
        this.phaseTotal = totalDaily * 365 + totalMonthly * 12 + totalYearly;
    }

    private updateProgress(): void {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '6', 10);
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
            ['Daily', '365', pipe.transform(this.phaseDailyTotal, 'eur')],
            ['Monthly', '12', pipe.transform(this.phaseMonthlyTotal, 'eur')],
            ['Yearly', '1', pipe.transform(this.phaseYearlyTotal, 'eur')],
        ];
    }

    getTooltipContent(): string {
        const pipe = new CurrencyConverterPipe();
        return `(${pipe.transform(this.phaseDailyTotal, 'eur')} * 365) + (${pipe.transform(this.phaseMonthlyTotal, 'eur')} * 12) + ${pipe.transform(this.phaseYearlyTotal, 'eur')}`;
    }

    public doTheLogging() {
        console.clear();
        // Log form datas
        this.calculateFormTotals();
    }

    navigate(direction: 'back' | 'next'): void {
        if (direction === 'back') {
            this.router.navigate(['/business-3'], { queryParams: { step: '5' } });
        } else {
            //this.doTheLogging();
            this.router.navigate(['/fees'], { queryParams: { step: '1' } });
        }
    }
}
