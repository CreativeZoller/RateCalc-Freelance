/**
 * A flexible list group component that displays items in a structured format.
 * Supports normal and summary layouts, custom styling, and navigation links.
 *
 * @component
 * @example
 * // Basic list with links
 * <app-list-group
 *   [headline]="'Navigation'"
 *   [type]="'normal'"
 *   [items]="[
 *     { content: 'Dashboard', href: '/dashboard' },
 *     { content: 'Settings', href: '/settings' }
 *   ]">
 * </app-list-group>
 *
 * // Summary list with custom background
 * <app-list-group
 *   [headline]="'Summary'"
 *   [type]="'sum'"
 *   [bgColor]="'gray'"
 *   [items]="[
 *     { content: 'Total Users: 150' },
 *     { content: 'Active Projects: 12' }
 *   ]">
 * </app-list-group>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListType, ListItem } from './list-group.types';
import { BackgroundColor, styleConfigs } from '@layout/page-layout.types';

@Component({
    selector: 'app-list-group',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="list-group">
            <h4 *ngIf="headline" [class]="getHeadlineClasses()">{{ headline }}</h4>

            <ul *ngIf="type === 'normal'" class="list-none space-y-2 w-full flex flex-col">
                <li *ngFor="let item of items" class="cursor-pointer">
                    <a *ngIf="item.href" [routerLink]="item.href" [class]="getLinkClasses()">
                        {{ item.content }}
                    </a>
                    <span *ngIf="!item.href" [class]="getTextClasses()">
                        {{ item.content }}
                    </span>
                </li>
            </ul>

            <ul *ngIf="type === 'sum'" class="list-none space-y-2 w-full flex flex-col">
                <li *ngFor="let item of items" class="cursor-pointer">
                    <a *ngIf="item.href" [routerLink]="item.href" [class]="getLinkClasses()">
                        {{ item.content }}
                    </a>
                    <span *ngIf="!item.href" [class]="getTextClasses()">
                        {{ item.content }}
                    </span>
                </li>
            </ul>
        </div>
    `,
})
export class ListGroupComponent {
    @Input() headline?: string;
    @Input() type: ListType = 'normal';
    @Input() items: ListItem[] = [];
    @Input() bgColor: BackgroundColor = 'blue';

    get styleConfig() {
        return styleConfigs[this.bgColor];
    }

    getLinkClasses(): string {
        const baseClasses = 'inline-flex items-center gap-x-3.5 py-2 px-3 w-11/12 text-sm font-semibold transition-all duration-300';
        const colorClasses = this.bgColor === 'gray' ? 'text-gray-base hover:text-gray-dark' : `${this.styleConfig.text} opacity-90 hover:opacity-100`;
        return `${baseClasses} ${colorClasses} -mt-px focus:z-10 focus:outline-none`;
    }

    getTextClasses(): string {
        const baseClasses = 'inline-flex items-center gap-x-3.5 py-2 px-3 text-sm font-semibold transition-all duration-300';
        const colorClasses = this.styleConfig.text;
        return `${baseClasses} ${colorClasses} -mt-px`;
    }

    getHeadlineClasses(): string {
        const baseClasses = 'text-md font-bold mb-3 uppercase';
        const colorClasses = this.styleConfig.neutral;
        return `${baseClasses} ${colorClasses}`;
    }
}
