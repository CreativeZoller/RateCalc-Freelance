import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
})
export class CardComponent implements OnInit {
    firstFormGroup = this._formBuilder.group({
        firstCtrl: [''],
    });
    secondFormGroup = this._formBuilder.group({
        firstCtrl: [''],
    });
    thirdFormGroup = this._formBuilder.group({
        firstCtrl: [''],
    });
    fourthFormGroup = this._formBuilder.group({
        firstCtrl: [''],
    });
    fifthFormGroup = this._formBuilder.group({
        firstCtrl: [''],
    });
    sixthFormGroup = this._formBuilder.group({
        firstCtrl: [''],
    });

    public singleToggled: boolean = true;
    constructor(private _formBuilder: FormBuilder) {}
    public toggleSingle() {
        return !this.singleToggled;
    }

    ngOnInit(): void {
        this.singleToggled = true;
    }
}
