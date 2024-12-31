/**
 * A flexible tabs component that supports both horizontal and vertical orientations.
 * Features include dynamic tab panels, custom styling, and background color theming.
 *
 * @component
 * @example
 * // Basic horizontal tabs
 * <app-tabs
 *   [orientation]="'horizontal'"
 *   [tabTriggers]="['Tab 1', 'Tab 2', 'Tab 3']">
 *   <app-tab-panel>Content for Tab 1</app-tab-panel>
 *   <app-tab-panel>Content for Tab 2</app-tab-panel>
 *   <app-tab-panel>Content for Tab 3</app-tab-panel>
 * </app-tabs>
 *
 * // Vertical tabs with custom background
 * <app-tabs
 *   [orientation]="'vertical'"
 *   [tabTriggers]="['Details', 'Settings']"
 *   [bgColor]="'gray'">
 *   <app-tab-panel>
 *     <div class="p-4">Details content...</div>
 *   </app-tab-panel>
 *   <app-tab-panel>
 *     <div class="p-4">Settings content...</div>
 *   </app-tab-panel>
 * </app-tabs>
 *
 * // Tabs with scrollable content
 * <app-tabs
 *   [tabTriggers]="['Long Content']"
 *   [bgColor]="'blue'">
 *   <app-tab-panel>
 *     <app-scroll-area>
 *       <div class="p-4">Scrollable content...</div>
 *     </app-scroll-area>
 *   </app-tab-panel>
 * </app-tabs>
 */
import { Component, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabOrientation, TabsProps } from './tabs.types';
import { getTabStyles } from './tabs.utils';
import { ScrollAreaComponent } from '@components/scroll-area/scroll-area.component';
import { TabPanelComponent } from './tab-panel.component';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule, ScrollAreaComponent, TabPanelComponent],
    template: `
        <div [class]="styles.container">
            <div [class]="styles.tabList">
                <button *ngFor="let tab of tabTriggers; let i = index" (click)="selectTab(i)" [class]="getTabTriggerClasses(i)" type="button">
                    {{ tab }}
                </button>
            </div>
            <div [class]="styles.content">
                <app-scroll-area [bgColor]="bgColor">
                    <ng-content></ng-content>
                </app-scroll-area>
            </div>
        </div>
    `,
})
export class TabsComponent implements TabsProps, AfterContentInit {
    @Input() orientation: TabOrientation = 'horizontal';
    @Input() tabTriggers: string[] = [];
    @Input() bgColor: BackgroundColor = 'blue';
    @ContentChildren(TabPanelComponent) tabPanels!: QueryList<TabPanelComponent>;

    private activeTabIndex: number = 0;
    styles = getTabStyles(this.orientation, this.bgColor);

    ngAfterContentInit() {
        this.updateStyles();
        this.updateActiveTabs();
    }

    ngOnChanges() {
        this.updateStyles();
    }

    private updateStyles() {
        this.styles = getTabStyles(this.orientation, this.bgColor);
    }

    selectTab(index: number) {
        this.activeTabIndex = index;
        this.updateActiveTabs();
    }

    private updateActiveTabs() {
        this.tabPanels.forEach((panel, index) => {
            panel.isActive = index === this.activeTabIndex;
        });
    }

    getTabTriggerClasses(index: number): string {
        return `${this.styles.tabTrigger.base} ${index === this.activeTabIndex ? this.styles.tabTrigger.active : this.styles.tabTrigger.inactive}`;
    }
}
