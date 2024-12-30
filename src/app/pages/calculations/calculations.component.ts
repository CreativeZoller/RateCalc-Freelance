import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent, CardComponent, ProgressBarComponent, DialogComponent } from '@components/index';
import { ConfigService } from '@services/config.service';
import { styleConfigs } from '@layout/page-layout.types';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-calculations',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, CardComponent, ProgressBarComponent, DialogComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'02'" [showSimplifiedState]="true" [paragraphs]="paragraphs" [bgColor]="bgColor">
            <div rightContent class="flex flex-col space-y-8 w-full">
                <app-card
                    [header]="{
                        title: 'Example Card',
                        description: 'This is a sample card implementation',
                    }"
                    [hasFooter]="true"
                    [bgColor]="">
                    <div cardContent class="space-y-4">
                        <p class="text-gray-base">
                            This is an example of how to use the card component. It supports headers, content, and footers, making it versatile for various use
                            cases.
                        </p>
                        <p class="text-gray-base">You can add multiple content elements and style them as needed.</p>
                    </div>
                    <div cardFooter class="flex space-x-4">
                        <app-button variant="success" (onClick)="navigateToNext()"> Check scrollable </app-button>
                        <app-button variant="primary" (onClick)="showInfoDialog = true"> Show Info </app-button>
                    </div>
                </app-card>

                <div class="flex flex-col items-center space-y-2 w-full">
                    <app-progress-bar value="40" length="100%" class="relative w-full pt-12"> </app-progress-bar>
                </div>
            </div>
        </app-page-layout>

        <app-dialog
            [(isOpen)]="showInfoDialog"
            [size]="'small'"
            [header]="{ title: 'Important Information' }"
            [hasFooter]="true"
            (secondaryAction)="handleRandomValue($event)">
            <div dialogContent class="space-y-4">
                <p class="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p class="text-gray-700">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </app-dialog>
    `,
})
export class CalculationsComponent implements OnInit {
    title: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    showInfoDialog: boolean = false;

    paragraphs = [
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            modifier: 'normal' as const,
        },
        {
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            modifier: 'bold' as const,
        },
        {
            content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            modifier: 'normal' as const,
        },
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

    navigateToNext() {
        this.router.navigate(['/scrolls']);
    }

    handleRandomValue(value: number) {
        console.log('Random value from dialog:', value);
    }
}
