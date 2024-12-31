import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { getRadioStyles } from './radio.utils';

@Component({
    selector: 'app-radio',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true,
        },
    ],
    template: `
        <div [class]="styles.container">
            <div class="relative flex items-start">
                <div class="flex h-5 items-center">
                    <input
                        type="radio"
                        [attr.id]="id || value"
                        [attr.name]="name"
                        [formControl]="control"
                        [value]="value"
                        [checked]="checked"
                        [class]="styles.input"
                        (blur)="onTouched()"
                        (change)="onChange($event)" />
                    <div [class]="styles.custom">
                        <div class="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                </div>
                <label [attr.for]="id || value" [class]="styles.label">
                    {{ label }}
                </label>
            </div>
        </div>
    `,
})
export class RadioComponent implements ControlValueAccessor {
    @Input() id?: string;
    @Input() name?: string;
    @Input() value?: string;
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
        return getRadioStyles(this.disabled);
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
