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
                        <td *ngFor="let cell of row; let i = index" [attr.colspan]="getColspanValue(cell)?.colspan" [class]="getBodyCellClasses(i)">
                            {{ getColspanValue(cell) ? '' : cell }}
                        </td>
                    </tr>
                </tbody>

                <tfoot *ngIf="tableFooter">
                    <tr [class]="getFooterRowClasses()">
                        <td
                            *ngFor="let footer of tableFooter; let i = index"
                            [attr.colspan]="getColspanValue(footer)?.colspan"
                            [class]="getFooterCellClasses(i)">
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

    private get isStandardSum(): boolean {
        return this.tableClasses.includes('standard-sum');
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
        const baseClasses = 'h-12 px-4 align-middle font-medium first:rounded-tl-lg last:rounded-tr-lg';
        const alignmentClass = this.isStandardSum ? 'text-center' : 'text-left';
        return `${baseClasses} ${alignmentClass} ${this.styles.headerCell}`;
    }

    getBodyClasses(): string {
        return this.tableClasses[2] || 'divide-y';
    }

    getBodyRowClasses(): string {
        return `transition-colors ${this.styles.bodyRow}`;
    }

    getBodyCellClasses(index: number): string {
        const baseClasses = 'p-4 align-middle';
        const alignmentClass = this.isStandardSum ? (index === 0 ? 'text-left' : 'text-right') : '';
        return `${baseClasses} ${alignmentClass} ${this.styles.bodyCell}`;
    }

    getFooterRowClasses(): string {
        return `text-sm font-medium transition-colors ${this.styles.footerRow}`;
    }

    getFooterCellClasses(index: number): string {
        const baseClasses = 'p-4 first:rounded-bl-lg last:rounded-br-lg';
        const alignmentClass = this.isStandardSum ? (index === 0 ? 'text-left' : 'text-right') : '';
        return `${baseClasses} ${alignmentClass} ${this.styles.footerCell}`;
    }

    getColspanValue(value: string): ColspanConfig | null {
        return parseColspanValue(value);
    }
}
