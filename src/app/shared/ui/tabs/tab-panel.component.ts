/**
 * A tab panel component that represents the content container for each tab.
 * Used in conjunction with the Tabs component to display tab content.
 *
 * @component
 * @example
 * // Basic usage within Tabs
 * <app-tabs [tabTriggers]="['Tab 1']">
 *   <app-tab-panel>
 *     <div>Tab content here</div>
 *   </app-tab-panel>
 * </app-tabs>
 *
 * // Multiple panels
 * <app-tabs [tabTriggers]="['First', 'Second']">
 *   <app-tab-panel>First tab content</app-tab-panel>
 *   <app-tab-panel>Second tab content</app-tab-panel>
 * </app-tabs>
 */
import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'app-tab-panel',
    standalone: true,
    template: '<ng-content *ngIf="isActive"></ng-content>',
    styles: [
        `
            :host {
                display: block;
                height: 100%;
            }
        `,
    ],
})
export class TabPanelComponent {
    @Input() isActive = false;

    constructor(public elementRef: ElementRef) {}
}
