import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { getCheckboxStyles } from './checkbox.utils';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
    template: `
        <div [class]="styles.container">
            <div class="relative flex items-start">
                <div class="flex h-5 items-center">
                    <input
                        type="checkbox"
                        [attr.id]="id || value"
                        [formControl]="control"
                        [value]="value"
                        [checked]="checked"
                        [class]="styles.input"
                        (blur)="onTouched()"
                        (change)="onChange($event)" />
                    <div [class]="styles.custom">
                        <svg class="h-3.5 w-3.5 stroke-white" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1L3.5 6.5L1 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
                <label [attr.for]="id || value" [class]="styles.label">
                    {{ label }}
                </label>
            </div>
        </div>
    `,
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() id?: string;
    @Input() value!: string;
    @Input() label!: string;
    @Input() checked: boolean = false;

    @Input() set disabled(value: boolean) {
        if (value !== this._disabled) {
            this._disabled = value;
            if (this.control) {
                value ? this.control.disable() : this.control.enable();
            }
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    @Input() set control(value: FormControl) {
        this._control = value;
        if (this._disabled) {
            this._control.disable();
        }
    }
    get control(): FormControl {
        return this._control;
    }
    private _control: FormControl = new FormControl();

    onChange: any = () => {};
    onTouched: any = () => {};

    get styles() {
        return getCheckboxStyles(this.disabled);
    }

    writeValue(value: any): void {
        if (this.control) {
            this.control.setValue(value, { emitEvent: false });
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
