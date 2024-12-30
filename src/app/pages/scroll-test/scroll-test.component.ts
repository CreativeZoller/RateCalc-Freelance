import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent } from '@components/button/button.component';
import { ParagraphComponent } from '@components/paragraph/paragraph.component';
import { ListGroupComponent } from '@components/list-group/list-group.component';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-scroll-test',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, ParagraphComponent, ListGroupComponent, ProgressBarComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'03'" [showScrollingState]="true" [bgColor]="bgColor">
            <div scrollContent>
                <ng-container *ngFor="let paragraph of paragraphs">
                    <app-paragraph [content]="paragraph.content" [modifier]="paragraph.modifier" [bgColor]="bgColor"> </app-paragraph>
                </ng-container>

                <app-list-group [headline]="'Important Links'" [type]="'normal'" [items]="listItems" [bgColor]="bgColor" class="mt-6"> </app-list-group>
            </div>

            <div rightContent class="flex flex-col space-y-8 w-full">
                <app-button variant="success" (onClick)="navigateToNext()"> Check tabbables </app-button>

                <div class="flex flex-col items-center space-y-2 w-full">
                    <app-progress-bar value="45" length="100%" class="relative w-full pt-12"> </app-progress-bar>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class ScrollTestComponent implements OnInit {
    title: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'blue';

    paragraphs = [
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', modifier: 'normal' as const },
        { content: 'Ut enim ad minim veniam, quis nostrud exercitation.', modifier: 'bold' as const },
        { content: 'Duis aute irure dolor in reprehenderit.', modifier: 'italic' as const },
    ];

    listItems = [
        { content: 'Documentation', href: '/docs' },
        { content: 'Getting Started Guide', href: '/guide' },
        { content: 'API Reference', href: '/api' },
        { content: 'Best Practices', href: '/practices' },
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
        this.router.navigate(['/tabs']);
    }
}
