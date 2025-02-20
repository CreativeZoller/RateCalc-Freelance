import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent } from '@components/index';
import { InputComponent, SelectComponent } from '@components/form-elements/index';
import { SelectData } from '@components/form-elements/select/select.types';
import { ConfigurationService, FormSignalService, FormCleanupService, ExpenseCalculationService } from '@services/index';
import { ExpenseFormGroup, ExpenseParagraph, RATE_OPTIONS } from 'app/types';

@Component({
    selector: 'app-travel',
    templateUrl: 'travel.component.html',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, StatusBarComponent, InputComponent, SelectComponent, ReactiveFormsModule],
})
export class TravelComponent implements OnInit, OnDestroy {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    progressValue = '1';
    numberOfSteps = 6;
    paragraphs: ExpenseParagraph[] = [{ content: 'You will most likely need to cover these costs, too.', modifier: 'normal' }];

    private formSubscription?: Subscription;
    rateOptions: SelectData[] = [
        { label: 'Daily', value: RATE_OPTIONS.DAILY },
        { label: 'Monthly', value: RATE_OPTIONS.MONTHLY },
        { label: 'Yearly', value: RATE_OPTIONS.YEARLY },
    ];
    travelForm = new FormGroup({
        transport: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        travel: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
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
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    private initializePageSettings(): void {
        this.title = 'Annual Expenses';
        this.subTitle = 'Travel';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '2');
            this.progressValue = this.calculateProgress(step);
        });
    }

    private loadSavedFormData(): void {
        const savedData = this.formSignalService.getFormData('travel');
        if (savedData?.controls) {
            Object.keys(savedData.controls).forEach((key) => {
                const group = this.travelForm.get(key) as FormGroup;
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
        this.formSubscription = this.travelForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((values) => {
            const cleanedValues = this.formCleanupService.cleanExpenseFormValues(values as ExpenseFormGroup);
            this.formSignalService.createOrUpdateFormData('travel', cleanedValues);
            this.calculationService.calculateTotals('travel');
        });
    }

    getControl(path: string): FormControl {
        return this.travelForm.get(path) as FormControl;
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

    navigate(direction: 'back' | 'next'): void {
        if (direction === 'back') {
            this.router.navigate(['/living'], { queryParams: { step: '1' } });
        } else if (direction === 'next') {
            this.router.navigate(['/business-1'], { queryParams: { step: '3' } });
        }
    }
}
