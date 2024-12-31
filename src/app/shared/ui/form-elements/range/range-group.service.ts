import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

interface RangeGroupState {
    [key: string]: {
        firstValue: number;
        secondValue: number;
        lastValue: number;
    };
}

@Injectable({
    providedIn: 'root',
})
export class RangeGroupService {
    private groupState = new BehaviorSubject<RangeGroupState>({});
    private controls: { [key: string]: { [position: string]: FormControl } } = {};

    registerRange(groupName: string, position: 'first' | 'second' | 'last', control: FormControl) {
        if (!groupName) return;

        // Initialize group controls if needed
        if (!this.controls[groupName]) {
            this.controls[groupName] = {};
        }

        // Store control reference
        this.controls[groupName][position] = control;

        // Initialize or get state
        const currentState = this.groupState.value[groupName] || {
            firstValue: 0,
            secondValue: 0,
            lastValue: 0,
        };

        // For the disabled last slider
        if (position === 'last') {
            control.disable();

            // Calculate initial value if both first and second controls exist
            if (this.controls[groupName]['first'] && this.controls[groupName]['second']) {
                const firstValue = this.controls[groupName]['first'].value || 0;
                const secondValue = this.controls[groupName]['second'].value || 0;
                const calculatedValue = Math.max(0, 100 - (firstValue + secondValue));

                currentState.lastValue = calculatedValue;
                control.setValue(calculatedValue, { emitEvent: true });
            }
        } else {
            // For active sliders (first and second), get current value and subscribe to changes
            const currentValue = control.value || 0;

            if (position === 'first') {
                currentState.firstValue = currentValue;
            } else if (position === 'second') {
                currentState.secondValue = currentValue;
            }

            control.valueChanges.subscribe((newValue) => {
                const state = { ...this.groupState.value[groupName] };
                const otherValue = position === 'first' ? this.controls[groupName]['second']?.value || 0 : this.controls[groupName]['first']?.value || 0;

                // Validate total doesn't exceed 100
                if (newValue + otherValue > 100) {
                    const oldValue = position === 'first' ? state.firstValue : state.secondValue;
                    control.setValue(oldValue, { emitEvent: false });
                    return;
                }

                // Update state
                if (position === 'first') {
                    state.firstValue = newValue;
                } else {
                    state.secondValue = newValue;
                }

                // Calculate and update last value
                const lastValue = Math.max(0, 100 - (state.firstValue + state.secondValue));
                state.lastValue = lastValue;

                // Update state
                this.groupState.next({
                    ...this.groupState.value,
                    [groupName]: state,
                });

                // Update last slider
                const lastControl = this.controls[groupName]['last'];
                if (lastControl) {
                    lastControl.setValue(lastValue, { emitEvent: true });

                    // Update form value to match GUI
                    if (position === 'first' || position === 'second') {
                        lastControl.updateValueAndValidity({ emitEvent: true });
                    }
                }
            });
        }

        // Store initial state
        this.groupState.next({
            ...this.groupState.value,
            [groupName]: currentState,
        });

        // Force immediate calculation if this completes the group
        if (this.controls[groupName]['first'] && this.controls[groupName]['second'] && this.controls[groupName]['last']) {
            const firstValue = this.controls[groupName]['first'].value || 0;
            const secondValue = this.controls[groupName]['second'].value || 0;
            const lastValue = Math.max(0, 100 - (firstValue + secondValue));

            const lastControl = this.controls[groupName]['last'];
            if (lastControl) {
                lastControl.setValue(lastValue, { emitEvent: true });
                lastControl.updateValueAndValidity({ emitEvent: true });
            }
        }
    }

    unregisterRange(groupName: string) {
        if (this.groupState.value[groupName]) {
            const newState = { ...this.groupState.value };
            delete newState[groupName];
            this.groupState.next(newState);
            delete this.controls[groupName];
        }
    }
}
