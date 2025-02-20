import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent, ListGroupComponent, TabsComponent, TabPanelComponent, TableComponent, DialogComponent } from '@components/index';
import { ConfigurationService, FormSignalService, ExpenseCalculationService } from '@services/index';
import { CurrencyConverterPipe } from '@pipes/index';
import { SummaryListItem } from 'app/types';

@Component({
    selector: 'app-sum-1',
    templateUrl: 'sum-1.component.html',
    standalone: true,
    imports: [
        CommonModule,
        PageLayoutComponent,
        ButtonComponent,
        StatusBarComponent,
        TabsComponent,
        TabPanelComponent,
        ListGroupComponent,
        TableComponent,
        DialogComponent,
        CurrencyConverterPipe,
    ],
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

    livingTotal = 0;
    travelTotal = 0;
    business1Total = 0;
    business2Total = 0;
    business3Total = 0;
    phaseDailyTotal = 0;
    phaseMonthlyTotal = 0;
    phaseYearlyTotal = 0;
    phaseTotal = 0;

    get essentialListItems(): SummaryListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [
            { content: `Living expenses (${pipe.transform(this.livingTotal, 'eur')})` },
            { content: `Travel expenses (${pipe.transform(this.travelTotal, 'eur')})` },
            { content: `Business 1 expenses (${pipe.transform(this.business1Total, 'eur')})` },
        ];
    }
    get optionalListItems(): SummaryListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [
            { content: `Business 2 expenses (${pipe.transform(this.business2Total, 'eur')})` },
            { content: `Business 3 expenses (${pipe.transform(this.business3Total, 'eur')})` },
        ];
    }

    tableHeaders: string[] = ['Subtotal', 'Annual multiplier', 'Amount you spend'];

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly configService: ConfigurationService,
        private readonly formSignalService: FormSignalService,
        private readonly calculationService: ExpenseCalculationService
    ) {}

    ngOnInit(): void {
        this.initializePageSettings();
        this.calculateFormTotals();
    }

    private initializePageSettings(): void {
        this.title = 'Break Even';
        this.subTitle = 'Annual Totals';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '6');
            this.progressValue = this.calculateProgress(step);
        });
    }

    private calculateFormTotals(): void {
        const formIds = ['living', 'travel', 'business1', 'business2', 'business3'];

        const totals = formIds.reduce(
            (acc, formId) => {
                const formData = this.formSignalService.getFormData(formId);
                if (!formData) return acc;

                const calculatedTotals = this.calculationService.calculateTotals(formId);
                const yearlyTotal = this.calculationService.convertToYearlyTotal(calculatedTotals);

                acc.daily += calculatedTotals.dailyTotal;
                acc.monthly += calculatedTotals.monthlyTotal;
                acc.yearly += calculatedTotals.yearlyTotal;
                acc.yearlyTotals[formId] = yearlyTotal;

                return acc;
            },
            { daily: 0, monthly: 0, yearly: 0, yearlyTotals: {} as Record<string, number> }
        );

        Object.entries(totals.yearlyTotals).forEach(([formId, total]) => {
            switch (formId) {
                case 'living':
                    this.livingTotal = total;
                    break;
                case 'travel':
                    this.travelTotal = total;
                    break;
                case 'business1':
                    this.business1Total = total;
                    break;
                case 'business2':
                    this.business2Total = total;
                    break;
                case 'business3':
                    this.business3Total = total;
                    break;
            }
        });

        this.phaseDailyTotal = totals.daily;
        this.phaseMonthlyTotal = totals.monthly;
        this.phaseYearlyTotal = totals.yearly;
        this.phaseTotal = this.phaseDailyTotal * 365 + this.phaseMonthlyTotal * 12 + this.phaseYearlyTotal;
    }

    private updateProgress(): void {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '6');
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

    navigate(direction: 'back' | 'next'): void {
        if (direction === 'back') {
            this.router.navigate(['/business-3'], { queryParams: { step: '5' } });
        } else {
            this.router.navigate(['/holidays'], { queryParams: { step: '1' } });
        }
    }
}
