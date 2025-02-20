import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputType } from './input.types';
import { FormElementSize } from '../common.types';
import { getInputStyles } from './input.utils';
// TODO: if type is number, add min and max values, min should be 0, max only generated if passed as attribute
@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
    template: `
        <label *ngIf="label" [attr.for]="id" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
            <svg *ngIf="required" width="7" height="7" class="inline ml-1 text-red-dark fill-current" viewBox="0 0 7 7">
                <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" />
            </svg>
        </label>

        <input
            [type]="type"
            [attr.id]="id"
            [formControl]="control"
            [placeholder]="placeholder || ''"
            [readonly]="readonly"
            [class]="getInputClasses()"
            [attr.required]="required || null"
            (blur)="onTouched()"
            (input)="onChange($event)" />

        <span *ngIf="hint" class="text-xs text-gray-base font-normal mt-1 block">
            {{ hint }}
        </span>
    `,
})
export class InputComponent implements ControlValueAccessor {
    @Input() type: InputType = 'text';
    @Input() size: FormElementSize = 'full';
    @Input() placeholder?: string;
    @Input() label?: string;
    @Input() readonly: boolean = false;
    @Input() required: boolean = false;
    @Input() id?: string;
    @Input() hint?: string;
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

    @HostBinding('class')
    get hostClasses(): string {
        const styles = getInputStyles(this.size, this.disabled);
        return styles.container;
    }

    onChange: any = () => {};
    onTouched: any = () => {};

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

    getInputClasses(): string {
        return getInputStyles(this.size, this.disabled).input;
    }
}
