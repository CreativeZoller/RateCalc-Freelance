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
        <div class="relative flex items-start">
            <div class="flex h-5 items-center">
                <input
                    type="checkbox"
                    [attr.id]="id || value"
                    [formControl]="control"
                    [value]="value"
                    class="h-4 w-4 opacity-0 absolute z-10"
                    [class.cursor-not-allowed]="disabled"
                    [class.cursor-pointer]="!disabled"
                    (blur)="onTouched()"
                    (change)="onCheckboxChange($event)" />
                <div class="absolute top-0 left-0 h-4 w-4 rounded border transition-all duration-200" [class]="getCustomCheckboxClasses()">
                    <svg
                        class="absolute inset-0 h-full w-full stroke-white transition-opacity duration-200"
                        [class.opacity-100]="isChecked"
                        [class.opacity-0]="!isChecked"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5L6.5 10.5L4 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <label
                [attr.for]="id || value"
                class="ml-3 block text-sm"
                [class.cursor-pointer]="!disabled"
                [class.cursor-not-allowed]="disabled"
                [class.text-gray-900]="!disabled"
                [class.text-gray-400]="disabled">
                {{ label }}
            </label>

            <span *ngIf="hint" class="text-xs text-gray-500 mt-1 block">{{ hint }}</span>
        </div>
    `,
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() id?: string;
    @Input() value!: string;
    @Input() label!: string;
    @Input() hint?: string;

    isChecked: boolean = false;

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
        this._control.valueChanges.subscribe((value) => {
            this.isChecked = value;
        });
    }
    get control(): FormControl {
        return this._control;
    }
    private _control: FormControl = new FormControl();

    onChange: any = () => {};
    onTouched: any = () => {};

    getCustomCheckboxClasses(): string {
        const baseClasses = ['peer-focus:ring-2', 'peer-focus:ring-offset-2', 'peer-focus:ring-blue-500'];

        if (this.isChecked) {
            baseClasses.push('bg-blue-600', 'border-blue-600');
        } else {
            baseClasses.push('bg-white', 'border-gray-300');
            if (!this.disabled) {
                baseClasses.push('hover:border-blue-500');
            }
        }

        if (this.disabled) {
            baseClasses.push('bg-gray-100', 'border-gray-200');
        }

        return baseClasses.join(' ');
    }

    onCheckboxChange(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        this.isChecked = checkbox.checked;
        this.onChange(checkbox.checked);
    }

    writeValue(value: any): void {
        if (this.control) {
            this.control.setValue(value, { emitEvent: false });
            this.isChecked = value;
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
