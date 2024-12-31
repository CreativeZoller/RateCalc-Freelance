import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent } from '@components/button/button.component';
import { TableComponent } from '@components/table/table.component';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-table-test',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, TableComponent, ProgressBarComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'05'" [showTableState]="true" [bgColor]="bgColor">
            <div
                tableContent
                class="w-full max-h-[calc(70vh-16rem)] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 active:scrollbar-thumb-slate-400">
                <app-table
                    [tableCaption]="'Sample Data Table'"
                    [tableCaptionPosition]="'top'"
                    [tableHeader]="tableHeaders"
                    [tableContent]="tableData"
                    [tableFooter]="tableFooters"
                    [bgColor]="bgColor">
                </app-table>
            </div>

            <div rightContent class="flex flex-col space-y-8 w-full">
                <app-button variant="danger" (onClick)="navigateToLanding()"> Start a new calculation </app-button>

                <div class="flex flex-col items-center space-y-2 w-full">
                    <app-progress-bar value="85" length="100%" class="relative w-full pt-12"> </app-progress-bar>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class TableTestComponent implements OnInit {
    title: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';

    tableHeaders: string[] = ['ID', 'Project Name', 'Client', 'Status'];

    tableFooters: string[] = ['colspan:3', 'Total Progress'];

    tableData: string[][] = [
        ['001', 'Website Redesign', 'TechCorp', 'In Progress'],
        ['002', 'Mobile App Development', 'StartupX', 'Completed'],
        ['003', 'E-commerce Platform', 'RetailPro', 'Planning'],
        ['004', 'CRM Integration', 'ServiceCo', 'On Hold'],
        ['005', 'Cloud Migration', 'DataTech', 'In Progress'],
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        this.title = this.route.snapshot.title as string;
        this.appName = this.configService.appTitle;
    }

    navigateToLanding() {
        this.router.navigate(['/error']);
    }
}
