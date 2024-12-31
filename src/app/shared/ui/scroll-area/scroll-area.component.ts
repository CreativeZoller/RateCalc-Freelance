/**
 * A customizable scrollable container component that provides styled scrollbars and smooth scrolling.
 * Supports different background colors and custom styling for the scrollbar track and thumb.
 *
 * @component
 * @example
 * // Basic usage with default styling
 * <app-scroll-area>
 *   <div>Long scrollable content...</div>
 * </app-scroll-area>
 *
 * // With custom background color
 * <app-scroll-area [bgColor]="'gray'">
 *   <div>Scrollable content with gray theme...</div>
 * </app-scroll-area>
 *
 * // With custom class and specific height
 * <app-scroll-area
 *   className="h-[500px]"
 *   [bgColor]="'blue'">
 *   <div>Fixed height scrollable content...</div>
 * </app-scroll-area>
 *
 * // Inside a card or panel
 * <div class="card">
 *   <app-scroll-area className="max-h-[300px]">
 *     <div>Card content with scroll...</div>
 *   </app-scroll-area>
 * </div>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundColor } from '@layout/page-layout.types';
import { ScrollAreaProps } from './scroll-area.types';
import { getScrollAreaStyles } from './scroll-area.utils';

@Component({
    selector: 'app-scroll-area',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [class]="getScrollAreaClasses()">
            <ng-content></ng-content>
        </div>
    `,
})
export class ScrollAreaComponent implements ScrollAreaProps {
    @Input() className: string = '';
    @Input() bgColor: BackgroundColor = 'blue';

    private get styles() {
        return getScrollAreaStyles(this.bgColor);
    }

    getScrollAreaClasses(): string {
        const { base, scrollbar } = this.styles;
        const scrollbarClasses = `${scrollbar.track} ${scrollbar.thumb.default} ${scrollbar.thumb.hover} ${scrollbar.thumb.active}`;
        const classes = `${base} ${scrollbarClasses}`;
        return this.className ? `${classes} ${this.className}` : classes;
    }
}
