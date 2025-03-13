import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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

    get styleConfig() {
        return styleConfigs[this.bgColor];
    }

    sidebarOpen = false;

    getLeftSectionClasses(): string {
        return `lg:w-1/2 p-4 ${this.styleConfig.background}`;
    }

    getSidebarBtnClasses(): string {
        return `text-${this.bgColor === 'gray' ? 'blue' : 'yellow'}-base`;
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;

        // Prevent body scrolling when sidebar is open
        if (this.sidebarOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }
}
