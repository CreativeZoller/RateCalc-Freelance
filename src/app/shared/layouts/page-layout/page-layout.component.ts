import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from '@components/paragraph/paragraph.component';
import { ScrollAreaComponent } from '@components/scroll-area/scroll-area.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { TableComponent } from '@components/table/table.component';
import { LogoComponent } from '@components/logo/logo.component';
import { ListGroupComponent } from '@components/list-group/list-group.component';
import { BackgroundColor } from './types/background.types';
import { PageLayoutProps } from './types/page-layout.types';
import { styleConfigs } from './utils/style-config.utils';

/**
 * Main page layout component that provides consistent structure and styling.
 * Supports different states (simplified, scrolling, tabs, table) and themes.
 *
 * @component
 * @example
 * ```typescript
 * // Basic usage
 * <app-page-layout
 *   title="Dashboard"
 *   appName="MyApp"
 *   stepNumber="01"
 *   [bgColor]="'blue'">
 *   <div rightContent>
 *     Content goes here
 *   </div>
 * </app-page-layout>
 *
 * // With scrolling content
 * <app-page-layout
 *   [showScrollingState]="true"
 *   [bgColor]="'gray'">
 *   <div scrollContent>
 *     Scrollable content
 *   </div>
 *   <div rightContent>
 *     Side content
 *   </div>
 * </app-page-layout>
 * ```
 */
@Component({
    selector: 'app-page-layout',
    standalone: true,
    imports: [CommonModule, ParagraphComponent, ScrollAreaComponent, TabsComponent, TableComponent, LogoComponent, ListGroupComponent],
    template: `
        <main class="min-h-screen w-full flex items-center justify-center bg-slate-700 p-4">
            <div class="w-full max-w-[1280px] h-auto lg:h-[70vh] lg:w-[80%] rounded-2xl shadow-lg border-none overflow-hidden">
                <div class="flex h-full flex-col lg:flex-row">
                    <section [class]="getLeftSectionClasses()">
                        <app-logo [content]="appName" [bgColor]="bgColor"> </app-logo>

                        <article>
                            <span [class]="'block text-6xl font-bold ' + styleConfig.accent">{{ stepNumber || '00' }}</span>
                            <span [class]="'block text-lg font-medium ' + styleConfig.text">{{ title }}</span>
                            <h1 [class]="'block text-6xl font-semibold mt-8 ' + styleConfig.text">Fee calculator</h1>
                        </article>

                        <div class="simplified_state mt-8" *ngIf="showSimplifiedState">
                            <ng-container *ngFor="let paragraph of paragraphs">
                                <app-paragraph [content]="paragraph.content" [modifier]="paragraph.modifier" [bgColor]="bgColor" class="mb-4"> </app-paragraph>
                            </ng-container>
                        </div>

                        <div class="scrolling_state h-full mt-8" *ngIf="showScrollingState">
                            <app-scroll-area>
                                <ng-content select="[scrollContent]"></ng-content>
                            </app-scroll-area>
                        </div>

                        <div class="tabbed_state h-full mt-8" *ngIf="showTabState">
                            <ng-content select="[tabContent]"></ng-content>
                        </div>

                        <div class="table_state h-full mt-8" *ngIf="showTableState">
                            <ng-content select="[tableContent]"></ng-content>
                        </div>
                    </section>
                    <section class="card-right-side w-full lg:w-1/2 bg-slate-100 p-8 flex items-center justify-center">
                        <ng-content select="[rightContent]"></ng-content>
                    </section>
                </div>
            </div>
        </main>
    `,
})
export class PageLayoutComponent implements PageLayoutProps {
    @Input() title: string = '';
    @Input() appName: string = '';
    @Input() stepNumber: string = '';
    @Input() showSimplifiedState: boolean = false;
    @Input() showScrollingState: boolean = false;
    @Input() showTabState: boolean = false;
    @Input() showTableState: boolean = false;
    @Input() bgColor: BackgroundColor = 'blue';
    @Input() paragraphs: Array<{
        content: string;
        modifier: 'bold' | 'italic' | 'underlined' | 'normal';
    }> = [];

    /**
     * Gets the current style configuration based on background color
     * @returns {StyleConfig} The style configuration object
     */
    get styleConfig() {
        return styleConfigs[this.bgColor];
    }

    /**
     * Gets the CSS classes for the left section
     * @returns {string} Space-separated class names
     */
    getLeftSectionClasses(): string {
        return `w-full lg:w-1/2 p-8 ${this.styleConfig.background}`;
    }
}
