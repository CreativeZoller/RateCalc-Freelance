import { BackgroundColor } from '@layout/page-layout.types';

export type ListType = 'normal' | 'sum';

export interface ListItem {
    content: string;
    href?: string;
}

export interface ListGroupProps {
    headline?: string;
    type: ListType;
    items: ListItem[];
    bgColor?: BackgroundColor;
}
