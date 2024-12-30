/**
 * A comprehensive table component that supports headers, footers, captions, and custom styling.
 * Features include column spanning, sticky headers, and responsive design.
 *
 * @component
 * @example
 * // Basic table with header and content
 * <app-table
 *   [tableHeader]="['ID', 'Name', 'Status']"
 *   [tableContent]="[
 *     ['1', 'John Doe', 'Active'],
 *     ['2', 'Jane Smith', 'Pending']
 *   ]">
 * </app-table>
 *
 * // Full-featured table with caption and footer
 * <app-table
 *   [tableCaption]="'Employee Status'"
 *   [tableCaptionPosition]="'top'"
 *   [tableHeader]="['ID', 'Name', 'Department', 'Status']"
 *   [tableContent]="[
 *     ['001', 'John Doe', 'Engineering', 'Active'],
 *     ['002', 'Jane Smith', 'Design', 'On Leave']
 *   ]"
 *   [tableFooter]="['colspan:3', 'Total: 2']"
 *   [bgColor]="'gray'">
 * </app-table>
 *
 * // Responsive table with custom classes
 * <app-table
 *   [tableClasses]="['min-w-full', 'divide-y', 'divide-gray-200']"
 *   [tableHeader]="headers"
 *   [tableContent]="content">
 * </app-table>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCaptionPosition, ColspanConfig } from './table.types';
import { parseColspanValue, getTableStyles } from './table.utils';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="overflow-y-visible rounded-lg">
            <table [class]="getTableClasses()">
                <caption *ngIf="tableCaption" [class]="getCaptionClasses()">
                    {{
                        tableCaption
                    }}
                </caption>

                <thead *ngIf="tableHeader.length > 0" [class]="getHeaderClasses()">
                    <tr [class]="getHeaderRowClasses()">
                        <th
                            *ngFor="let header of tableHeader; let i = index"
                            [attr.colspan]="getColspanValue(header)?.colspan"
                            [class]="getHeaderCellClasses()">
                            {{ getColspanValue(header) ? '' : header }}
                        </th>
                    </tr>
                </thead>

                <tbody [class]="getBodyClasses()">
                    <tr *ngFor="let row of tableContent" [class]="getBodyRowClasses()">
                        <td *ngFor="let cell of row" [attr.colspan]="getColspanValue(cell)?.colspan" [class]="getBodyCellClasses()">
                            {{ getColspanValue(cell) ? '' : cell }}
                        </td>
                    </tr>
                </tbody>

                <tfoot *ngIf="tableFooter">
                    <tr [class]="getFooterRowClasses()">
                        <td *ngFor="let footer of tableFooter" [attr.colspan]="getColspanValue(footer)?.colspan" [class]="getFooterCellClasses()">
                            {{ getColspanValue(footer) ? '' : footer }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `,
})
export class TableComponent {
    @Input() tableClasses: string[] = [];
    @Input() tableCaption?: string;
    @Input() tableCaptionPosition: TableCaptionPosition = 'top';
    @Input() tableHeader: string[] = [];
    @Input() tableContent: string[][] = [];
    @Input() tableFooter?: string[] = [];
    @Input() bgColor: BackgroundColor = 'blue';

    private get styles() {
        return getTableStyles(this.bgColor);
    }

    getTableClasses(): string {
        const baseClasses = 'min-w-full rounded-xl text-sm border-separate border-spacing-0';
        const textColor = this.styles.text;
        return this.tableClasses[0] ? `${baseClasses} ${textColor} ${this.tableClasses[0]}` : `${baseClasses} ${textColor}`;
    }

    getCaptionClasses(): string {
        return `text-sm ${this.styles.text} ${this.tableCaptionPosition === 'top' ? 'mt-2 mb-4' : 'mt-4 mb-2'}`;
    }

    getHeaderClasses(): string {
        return `${this.styles.header} sticky top-0 text-base`;
    }

    getHeaderRowClasses(): string {
        return `${this.styles.headerRow}`;
    }

    getHeaderCellClasses(): string {
        return `h-12 px-4 text-left align-middle font-medium first:rounded-tl-lg last:rounded-tr-lg ${this.styles.headerCell}`;
    }

    getBodyClasses(): string {
        return this.tableClasses[2] || 'divide-y';
    }

    getBodyRowClasses(): string {
        return `transition-colors ${this.styles.bodyRow}`;
    }

    getBodyCellClasses(): string {
        return `p-4 align-middle ${this.styles.bodyCell}`;
    }

    getFooterRowClasses(): string {
        return `text-sm font-medium transition-colors ${this.styles.footerRow}`;
    }

    getFooterCellClasses(): string {
        return `p-4 first:rounded-bl-lg last:rounded-br-lg ${this.styles.footerCell}`;
    }

    getColspanValue(value: string): ColspanConfig | null {
        return parseColspanValue(value);
    }
}
