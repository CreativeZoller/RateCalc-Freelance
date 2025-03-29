import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ParagraphComponent } from '@components/paragraph/paragraph.component';
import { ScrollAreaComponent } from '@components/scroll-area/scroll-area.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { TableComponent } from '@components/table/table.component';
import { LogoComponent } from '@components/logo/logo.component';
import { ListGroupComponent } from '@components/list-group/list-group.component';
import { BackgroundColor } from './types/background.types';
import { PageLayoutProps } from './types/page-layout.types';
import { styleConfigs } from './utils/style-config.utils';

@Component({
    selector: 'app-page-layout',
    templateUrl: 'page-layout.component.html',
    standalone: true,
    imports: [CommonModule, ParagraphComponent, ScrollAreaComponent, TabsComponent, TableComponent, LogoComponent, ListGroupComponent],
})
export class PageLayoutComponent implements PageLayoutProps {
    @Input() title: string = '';
    @Input() appName: string = '';
    @Input() stepNumber: string = '';
    @Input() subTitle: string = '';
    @Input() showSimplifiedState: boolean = false;
    @Input() showScrollingState: boolean = false;
    @Input() showTabState: boolean = false;
    @Input() showTableState: boolean = false;
    @Input() bgColor: BackgroundColor = 'blue';
    @Input() paragraphs: Array<{
        content: string;
        modifier: 'bold' | 'italic' | 'underlined' | 'normal';
    }> = [];
    sidebarOpen = signal(false);

    constructor(private router: Router) {}

    get styleConfig() {
        return styleConfigs[this.bgColor];
    }

    getLeftSectionClasses(): string {
        return `lg:w-1/2 p-4 ${this.styleConfig.background}`;
    }

    getSidebarBtnClasses(): string {
        return `${this.bgColor === 'gray' ? 'text-primaryGray-link' : 'text-primaryBlue-link'}`;
    }

    toggleSidebar() {
        this.sidebarOpen.update((value) => !value);
    }

    navigateToInvolvement() {
        this.router.navigate(['/information']);
    }
}
