import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    stepperOrientation: Observable<StepperOrientation>;
    private _mobileQueryListener: () => void;
    public appTitle: string = 'App';

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)').pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    firstFormGroup = this.formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this.formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    thirdFormGroup = this.formBuilder.group({
        thirdCtrl: ['', Validators.required],
    });

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
