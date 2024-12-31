import { BackgroundColor } from '@layout/page-layout.types';

export type TabOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
    orientation?: TabOrientation;
    tabTriggers: string[];
    bgColor?: BackgroundColor;
}

export interface TabStyles {
    container: string;
    tabList: string;
    tabTrigger: {
        base: string;
        active: string;
        inactive: string;
    };
    content: string;
}
