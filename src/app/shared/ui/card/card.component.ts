/**
 * A versatile card component that can display content with optional header and footer sections.
 * Supports different background colors and custom styling.
 *
 * @component
 * @example
 * // Basic card with header
 * <app-card
 *   [header]="{ title: 'Card Title', description: 'Card description' }">
 *   <div cardContent>
 *     Content goes here
 *   </div>
 * </app-card>
 *
 * // Card with footer and custom background
 * <app-card
 *   [header]="{ title: 'Actions Card' }"
 *   [hasFooter]="true"
 *   [bgColor]="'blue'">
 *   <div cardContent>Main content</div>
 *   <div cardFooter>Footer actions</div>
 * </app-card>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeader } from './card.types';
import { getCardStyles } from './card.utils';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [class]="getCardClasses()">
            <div *ngIf="header" class="p-6 flex flex-col space-y-1.5">
                <h3 [class]="'text-2xl font-semibold leading-none tracking-tight ' + styles.header.title">
                    {{ header.title }}
                </h3>
                <p *ngIf="header.description" [class]="'text-sm ' + styles.header.description">
                    {{ header.description }}
                </p>
            </div>

            <div [class]="'p-6 pt-0 ' + styles.content">
                <ng-content select="[cardContent]"></ng-content>
            </div>

            <div *ngIf="hasFooter" [class]="'p-6 flex items-center ' + styles.footer">
                <ng-content select="[cardFooter]"></ng-content>
            </div>
        </div>
    `,
})
export class CardComponent {
    @Input() cardClass?: string;
    @Input() header?: CardHeader;
    @Input() hasFooter: boolean = false;
    @Input() bgColor?: BackgroundColor;

    get styles() {
        return getCardStyles(this.bgColor);
    }

    getCardClasses(): string {
        return this.cardClass ? `${this.styles.container} ${this.cardClass}` : this.styles.container;
    }
}
