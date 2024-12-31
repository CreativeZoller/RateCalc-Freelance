import { BackgroundColor } from '@layout/page-layout.types';

export type TableCaptionPosition = 'top' | 'bottom';

export interface TableProps {
    tableClasses?: string[];
    tableCaption?: string;
    tableCaptionPosition?: TableCaptionPosition;
    tableHeader: string[];
    tableContent: string[][];
    tableFooter?: string[];
    bgColor?: BackgroundColor;
}

export interface ColspanConfig {
    colspan: number;
    content?: string;
}

export interface TableStyles {
    text: string;
    header: string;
    headerRow: string;
    headerCell: string;
    bodyRow: string;
    bodyCell: string;
    footerRow: string;
    footerCell: string;
}
