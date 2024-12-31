import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { getRangeStyles } from './range.utils';
import { RangeGroupService } from './range-group.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-range',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeComponent),
            multi: true,
        },
    ],
    template: `
        <div [class]="styles.container">
            <label *ngIf="caption" [attr.for]="id" class="block text-sm font-medium text-gray-700 mb-1">
                {{ caption }}
                <svg *ngIf="required" width="7" height="7" class="inline ml-1 text-red-dark fill-current" viewBox="0 0 7 7">
                    <path
                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" />
                </svg>
                <span [class]="styles.value">{{ displayValue }}%</span>
            </label>

            <div class="relative mb-6 flex items-center gap-4">
                <div class="w-full">
                    <input
                        type="range"
                        [attr.id]="id"
                        [attr.name]="name"
                        [formControl]="control"
                        [attr.min]="min"
                        [attr.max]="max"
                        [attr.step]="step"
                        [attr.required]="required || null"
                        [attr.disabled]="isDisabled || control.disabled"
                        [class]="styles.range"
                        (blur)="onTouched()"
                        (input)="onRangeInput($event)" />

                    <div *ngIf="showLabels" [class]="styles.labels">
                        <div class="relative pt-6">
                            <div class="absolute left-0">{{ min }}%</div>
                            <div class="absolute left-1/4 -translate-x-1/2">{{ min + (max - min) / 4 }}%</div>
                            <div class="absolute left-1/2 -translate-x-1/2">{{ min + (max - min) / 2 }}%</div>
                            <div class="absolute left-3/4 -translate-x-1/2">{{ max - (max - min) / 4 }}%</div>
                            <div class="absolute right-0 translate-x-1">{{ max }}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class RangeComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() id: string = 'range';
    @Input() name: string = 'range';
    @Input() caption: string = 'Range slider';
    @Input() showLabels: boolean = false;
    @Input() required: boolean = false;
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() step: number = 1;
    @Input() isDisabled: boolean = false;

    @Input() groupName?: string;
    @Input() groupPosition?: 'first' | 'second' | 'last';

    private valueChangeSubscription?: Subscription;
    private controlSubscription?: Subscription;

    @Input() set control(value: FormControl) {
        if (this._control !== value) {
            this._control = value;
            this.setupControl();
        }
    }
    get control(): FormControl {
        return this._control;
    }
    private _control: FormControl = new FormControl(0);

    get displayValue(): number {
        return Math.round(this.control.value ?? this.min);
    }

    onChange: any = () => {};
    onTouched: any = () => {};

    get styles() {
        return getRangeStyles(this.isDisabled || this.control.disabled);
    }

    constructor(private rangeGroupService: RangeGroupService) {}

    ngOnInit() {
        this.setupControl();

        if (this.groupName && this.groupPosition) {
            // Register with group service
            this.rangeGroupService.registerRange(this.groupName, this.groupPosition, this.control);
        }
    }

    private setupControl() {
        // Clean up existing subscriptions
        this.valueChangeSubscription?.unsubscribe();
        this.controlSubscription?.unsubscribe();

        // Set up new subscriptions
        this.valueChangeSubscription = this.control.valueChanges.subscribe((value) => {
            this.onChange(value);
        });

        // For the last (disabled) slider in a group
        if (this.groupName && this.groupPosition === 'last') {
            this.controlSubscription = this.control.valueChanges.subscribe((value) => {
                // Ensure the value is properly displayed
                requestAnimationFrame(() => {
                    this.control.setValue(value, { emitEvent: false });
                });
            });
        }

        // If control has an initial value, trigger calculation
        if (this.control.value !== null && this.control.value !== undefined) {
            this.control.setValue(this.control.value, { emitEvent: true });
        }
    }

    ngOnDestroy() {
        this.valueChangeSubscription?.unsubscribe();
        this.controlSubscription?.unsubscribe();
        if (this.groupName) {
            this.rangeGroupService.unregisterRange(this.groupName);
        }
    }

    onRangeInput(event: Event) {
        const value = parseInt((event.target as HTMLInputElement).value);
        this.control.setValue(value, { emitEvent: true });
    }

    writeValue(value: any): void {
        if (this.control) {
            const numValue = value !== null && value !== undefined ? parseInt(value) : this.min;
            this.control.setValue(numValue, { emitEvent: true });
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }
}
