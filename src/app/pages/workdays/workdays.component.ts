import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent } from '@components/index';
import { InputComponent } from '@components/form-elements/index';
import { ConfigurationService, FormSignalService, ExpenseCalculationService, FormCleanupService } from '@services/index';
import { ExpenseFormGroup, ExpenseParagraph } from 'app/types';

@Component({
    selector: 'app-work-on',
    templateUrl: 'workdays.component.html',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, StatusBarComponent, InputComponent, ReactiveFormsModule],
})
export class WorkOnComponent implements OnInit, OnDestroy {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'blue';
    progressValue = '2';
    numberOfSteps = 3;
    paragraphs: ExpenseParagraph[] = [{ content: 'The total number of days per year that you will be working on your business.', modifier: 'normal' }];

    totalWorkDays = 0;
    totalAvailable = 0;
    private formSubscription?: Subscription;
    workOnForm = new FormGroup({
        availabledays: new FormGroup({
            value: new FormControl(''),
        }),
        workdays: new FormGroup({
            value: new FormControl(''),
        }),
        workhours: new FormGroup({
            value: new FormControl(''),
        }),
    });

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly configService: ConfigurationService,
        private readonly formSignalService: FormSignalService,
        private readonly calculationService: ExpenseCalculationService,
        private readonly formCleanupService: FormCleanupService
    ) {}

    ngOnInit() {
        this.initializePageSettings();
        this.loadSavedFormData();
        this.setupFormSubscription();
        this.loadTotalAvailable();
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    private initializePageSettings(): void {
        this.title = 'Working Time';
        this.subTitle = 'Working On';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '1');
            this.progressValue = this.calculateProgress(step);
        });
    }

    private loadSavedFormData(): void {
        const savedData = this.formSignalService.getFormData('workOn');
        if (savedData?.controls) {
            Object.keys(savedData.controls).forEach((key) => {
                const group = this.workOnForm.get(key) as FormGroup;
                if (group) {
                    const savedGroup = savedData.controls[key] as any;
                    if (savedGroup) {
                        const value = savedGroup.value;
                        const rate = savedGroup.rate;

                        if (value && parseFloat(value) !== 0) {
                            group.patchValue(
                                {
                                    value: value,
                                    rate: rate,
                                },
                                { emitEvent: false }
                            );
                        } else {
                            group.patchValue(
                                {
                                    value: '',
                                    rate: '',
                                },
                                { emitEvent: false }
                            );
                        }
                    }
                }
            });
        }
    }

    private setupFormSubscription(): void {
        this.formSubscription = this.workOnForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((values) => {
            const cleanedValues = this.formCleanupService.cleanExpenseFormValues(values as ExpenseFormGroup);
            this.formSignalService.createOrUpdateFormData('workOn', cleanedValues);
            this.calculationService.calculateTotals('workOn');
            this.loadTotalAvailable();
            this.calculateWorkdays();
        });
    }

    private loadTotalAvailable(): void {
        const holidays = this.formSignalService.getFormData('workOff');
        const calculations = holidays?.controls?.['calculations'];
        const totalDaysOff: number = calculations && typeof calculations === 'object' && 'total' in calculations ? (calculations.total as number) : 0;
        this.totalAvailable = 365 - totalDaysOff;
        this.workOnForm.get('availabledays.value')?.setValue(this.totalAvailable.toString(), { emitEvent: false });
    }

    getControl(path: string): FormControl {
        return this.workOnForm.get(path) as FormControl;
    }

    // Method to calculate total workdays
    public calculateWorkdays(): void {
        const workdaysPerWeek = Number(this.getControl('workdays.value').value || 0);
        const availableDays = Number(this.getControl('availabledays.value').value || 0);
        this.totalWorkDays = workdaysPerWeek > 0 && availableDays > 0 ? Math.floor((availableDays / 7) * workdaysPerWeek) : 0;
    }

    private updateProgress(): void {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '2');
        this.progressValue = this.calculateProgress(step);
    }

    private calculateProgress(step: number): string {
        if (step === 1) return '0';
        if (step === this.numberOfSteps) return '100';

        const stepPercentage = 100 / (this.numberOfSteps - 1);
        return ((step - 1) * stepPercentage).toString();
    }

    navigate(direction: 'back' | 'next') {
        if (direction === 'back') {
            this.router.navigate(['/holidays'], { queryParams: { step: '1' } });
        } else if (direction === 'next') {
            this.router.navigate(['/minimum-rates'], { queryParams: { step: '3' } });
        }
    }
}
