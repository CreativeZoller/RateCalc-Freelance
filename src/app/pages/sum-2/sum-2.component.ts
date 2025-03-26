import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent, ListGroupComponent, TabsComponent, TabPanelComponent, DialogComponent } from '@components/index';
import { ConfigurationService, ExportService, FormSignalService, ExpenseCalculationService } from '@services/index';
import { CurrencyConverterPipe } from '@pipes/index';
import { CalculationResults, ListItem, TimeMetrics, ExpenseSummary, ExpenseFormData } from 'app/types';

@Component({
    selector: 'app-sum-2',
    templateUrl: 'sum-2.component.html',
    standalone: true,
    imports: [
        CommonModule,
        PageLayoutComponent,
        ButtonComponent,
        StatusBarComponent,
        TabsComponent,
        TabPanelComponent,
        ListGroupComponent,
        DialogComponent,
        ReactiveFormsModule,
        CurrencyConverterPipe,
    ],
})
export class Sum2Component implements OnInit {
    title = '';
    subTitle = '';
    appName = '';
    bgColor: BackgroundColor = 'gray';
    tableBgColor: BackgroundColor = 'gray';
    showDetailsDialog = false;
    progressValue = '3';
    numberOfSteps = 3;

    livingTotal = 0;
    travelTotal = 0;
    business1Total = 0;
    business2Total = 0;
    business3Total = 0;
    calculatedRates: CalculationResults | null = null;
    expenseSummary: ExpenseSummary | null = null;
    workOffForm: FormGroup;
    workOnForm: FormGroup;

    get expensesListItems(): ListItem[] {
        const pipe = new CurrencyConverterPipe();
        return [
            { content: `Living expenses (${pipe.transform(this.livingTotal, 'eur')})` },
            { content: `Travel expenses (${pipe.transform(this.travelTotal, 'eur')})` },
            { content: `Business 1 expenses (${pipe.transform(this.business1Total, 'eur')})` },
            { content: `Business 2 expenses (${pipe.transform(this.business2Total, 'eur')})` },
            { content: `Business 3 expenses (${pipe.transform(this.business3Total, 'eur')})` },
        ];
    }

    get timeListItems(): ListItem[] {
        return [
            { content: `Working time (${this.getTimeMetric('workingDays')} days)` },
            { content: `Holiday time (${this.getTimeMetric('daysOff')} days)` },
            { content: `Working hours daily (${this.getTimeMetric('hoursPerDay')} hours)` },
        ];
    }

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly fb: FormBuilder,
        private readonly configService: ConfigurationService,
        private readonly formSignalService: FormSignalService,
        private readonly calculationService: ExpenseCalculationService,
        private readonly exportService: ExportService
    ) {
        this.workOffForm = this.fb.group({ holidays: [0], sickleaves: [0], vacations: [0] });
        this.workOnForm = this.fb.group({ workdays: [0], workhours: [0] });
    }

    ngOnInit(): void {
        this.initializePageSettings();
        this.calculateFormTotals();
        this.calculateAndStoreRates();
        this.expenseSummary = this.calculationService.calculateDetailedExpenseSummary();
    }

    private initializePageSettings(): void {
        this.title = 'Minimum Rates';
        this.subTitle = 'Summary';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '3');
            this.progressValue = this.calculateProgress(step);
        });
    }

    formatRate(rate: string | undefined): string {
        if (!rate) return 'N/A';
        switch (rate) {
            case '365':
                return 'Daily';
            case '12':
                return 'Monthly';
            case '1':
                return 'Yearly';
            default:
                return rate;
        }
    }

    getTimeMetric(metric: keyof TimeMetrics): number {
        if (!this.expenseSummary || !this.expenseSummary.timeMetrics) {
            console.warn('Expense summary or time metrics are not available');
            return 0;
        }
        const value = this.expenseSummary.timeMetrics[metric];
        if (value === undefined) {
            console.warn(`Time metric '${metric}' is not available`);
            return 0;
        }
        return value;
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
            (this as any)[`${formId}Total`] = total;
        });
    }

    calculateAndStoreRates(): void {
        this.calculatedRates = this.calculateRates();
        this.expenseSummary = this.calculationService.calculateDetailedExpenseSummary();
    }

    calculateRates(): CalculationResults | null {
        const workOffData = this.formSignalService.getFormData('workOff') as ExpenseFormData | undefined;
        const workOnData = this.formSignalService.getFormData('workOn') as ExpenseFormData | undefined;

        if (!workOffData?.controls || !workOnData?.controls) {
            return null;
        }

        const holidays = Number(workOffData.controls['holidays']?.value) || 0;
        const sickleaves = Number(workOffData.controls['sickleaves']?.value) || 0;
        const vacations = Number(workOffData.controls['vacations']?.value) || 0;
        const totalDaysOff = holidays + sickleaves + vacations;

        const workdays = Number(workOnData.controls['workdays']?.value) || 0;
        const workhours = Number(workOnData.controls['workhours']?.value) || 0;

        const totalWorkingTime = 365 - totalDaysOff;
        const totalWorkHours = totalWorkingTime * workhours;

        if (workdays <= 0 || workhours <= 0) {
            console.warn('Invalid workdays or workhours value, cannot proceed.');
            return null;
        }

        const expensesTotal = this.livingTotal + this.travelTotal + this.business1Total + this.business2Total + this.business3Total;

        const avgWorkDays = 22;
        const minRate = expensesTotal ? expensesTotal / totalWorkHours : 0;
        const minHourlyRate = expensesTotal ? Math.round(minRate * 100) / 100 : 0;
        const avgDailyRate = expensesTotal ? minHourlyRate * workhours : 0;
        const minDailyRate = expensesTotal ? Math.round(avgDailyRate * 100) / 100 : 0;
        const avgMonthlyRate = expensesTotal ? minDailyRate * avgWorkDays : 0;
        const minMonthlyRate = expensesTotal ? Math.round(avgMonthlyRate * 100) / 100 : 0;

        return {
            totalWorkingTime,
            totalDaysOff,
            minHourlyRate,
            minDailyRate,
            minMonthlyRate,
            workhours,
        };
    }

    private updateProgress(): void {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '3');
        this.progressValue = this.calculateProgress(step);
    }

    private calculateProgress(step: number): string {
        if (step === 1) return '0';
        if (step === this.numberOfSteps) return '100';

        const stepPercentage = 100 / (this.numberOfSteps - 1);
        return ((step - 1) * stepPercentage).toString();
    }

    public doTheCleaning() {
        console.clear();
        this.formSignalService.resetAllForms();
        this.formSignalService.clearAllData();
    }

    navigate(direction: 'back' | 'next'): void {
        if (direction === 'back') {
            this.router.navigate(['/workdays'], { queryParams: { step: '2' } });
        } else {
            this.doTheCleaning();
            this.router.navigate(['/landing']);
        }
    }

    exportToPDF(): void {
        if (this.expenseSummary && this.calculatedRates) {
            this.exportService.exportToPDF(this.expenseSummary, this.calculatedRates);
        }
    }

    exportToExcel(): void {
        if (this.expenseSummary && this.calculatedRates) {
            this.exportService.exportToExcel(this.expenseSummary, this.calculatedRates);
        }
    }
}
