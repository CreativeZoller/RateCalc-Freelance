import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleKind } from './toggle.types';
import { getToggleStyles } from './toggle.utils';

@Component({
    selector: 'app-toggle',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true,
        },
    ],
    template: `
        <div [class]="styles.containerDiv">
            <span *ngIf="kind === 'double'" [class]="styles.labelDouble">No</span>

            <label [class]="styles.containerLabel" [for]="id">
                <input
                    type="checkbox"
                    [formControl]="control"
                    [value]="value"
                    [attr.name]="name"
                    [attr.id]="id"
                    [class]="styles.input"
                    [checked]="checked"
                    (blur)="onTouched()"
                    (change)="onChange($event)" />
                <div [class]="styles.switch.track"></div>
                <span *ngIf="kind !== 'double'" [class]="styles.switch.thumb">
                    {{ label }}
                </span>
            </label>

            <span *ngIf="kind === 'double'" [class]="styles.labelDouble">Yes</span>
        </div>
    `,
})
export class ToggleComponent implements ControlValueAccessor {
    @Input() id?: string;
    @Input() name?: string;
    @Input() value?: string;
    @Input() kind: ToggleKind = 'off';
    @Input() label: string = 'Enabled';
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
        return getToggleStyles(this.disabled);
    }

    ngOnInit() {
        if (!this.id) {
            this.id = this.value || 'toggle-' + Math.random().toString(36).substr(2, 9);
        }
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
