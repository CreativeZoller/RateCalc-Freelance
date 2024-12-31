import { ColspanConfig, TableStyles } from './table.types';
import { BackgroundColor } from '@layout/page-layout.types';

export function parseColspanValue(value: string): ColspanConfig | null {
    const colspanMatch = value.match(/^colspan:(\d+)$/);
    if (colspanMatch) {
        return {
            colspan: parseInt(colspanMatch[1], 10),
            content: '',
        };
    }
    return null;
}

export function getTableStyles(bgColor: BackgroundColor): TableStyles {
    const isGray = bgColor === 'gray';

    return {
        text: isGray ? 'text-gray-base' : 'text-slate-200',
        header: isGray ? 'bg-gray-dark' : 'bg-slate-200/40',
        headerRow: isGray ? 'bg-slate-300' : 'bg-slate-200/40',
        headerCell: isGray ? 'text-gray-base' : 'text-slate-200',
        bodyRow: isGray ? 'hover:bg-slate-200' : 'hover:bg-slate-200/20',
        bodyCell: isGray ? 'border-b border-slate-300' : 'border-b border-slate-200/20',
        footerRow: isGray ? 'hover:bg-gray-dark/80' : 'hover:bg-slate-200/20',
        footerCell: isGray ? 'bg-slate-300' : 'bg-slate-200/40',
    };
}
