import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, StatusBarComponent } from '@components/index';
import { InputComponent, SelectComponent } from '@components/form-elements/index';
import { SelectData } from '@components/form-elements/select/select.types';
import { ConfigurationService, FormSignalService, ExpenseCalculationService, FormCleanupService } from '@services/index';
import { ExpenseFormGroup, ExpenseParagraph, RATE_OPTIONS } from 'app/types';

@Component({
    selector: 'app-business-2',
    templateUrl: 'business-2.component.html',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, StatusBarComponent, InputComponent, SelectComponent, ReactiveFormsModule],
})
export class Business2Component implements OnInit, OnDestroy {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    progressValue = '4';
    numberOfSteps = 6;
    paragraphs: ExpenseParagraph[] = [{ content: 'These can be considered optional if you are just getting started.', modifier: 'normal' }];

    private formSubscription?: Subscription;
    rateOptions: SelectData[] = [
        { label: 'Daily', value: RATE_OPTIONS.DAILY },
        { label: 'Monthly', value: RATE_OPTIONS.MONTHLY },
        { label: 'Yearly', value: RATE_OPTIONS.YEARLY },
    ];
    business2Form = new FormGroup({
        ads: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        legal: new FormGroup({
            value: new FormControl(''),
            rate: new FormControl(''),
        }),
        self: new FormGroup({
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
        this.subTitle = 'Business 2';
        this.appName = this.configService.appTitle;

        this.updateProgress();
        this.route.queryParams.subscribe((params) => {
            const step = parseInt(params['step'] || '4');
            this.progressValue = this.calculateProgress(step);
        });
    }

    private loadSavedFormData(): void {
        const savedData = this.formSignalService.getFormData('business2');
        if (savedData?.controls) {
            Object.keys(savedData.controls).forEach((key) => {
                const group = this.business2Form.get(key) as FormGroup;
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
        this.formSubscription = this.business2Form.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((values) => {
            const cleanedValues = this.formCleanupService.cleanExpenseFormValues(values as ExpenseFormGroup);
            this.formSignalService.createOrUpdateFormData('business2', cleanedValues);
            this.calculationService.calculateTotals('business2');
        });
    }

    getControl(path: string): FormControl {
        return this.business2Form.get(path) as FormControl;
    }

    private updateProgress(): void {
        const step = parseInt(this.route.snapshot.queryParams['step'] || '4');
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
            this.router.navigate(['/business-1'], { queryParams: { step: '3' } });
        } else if (direction === 'next') {
            this.router.navigate(['/business-3'], { queryParams: { step: '5' } });
        }
    }
}
