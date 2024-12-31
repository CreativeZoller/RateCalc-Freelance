import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent } from '@components/button/button.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { TabPanelComponent } from '@components/tabs/tab-panel.component';
import { ParagraphComponent } from '@components/paragraph/paragraph.component';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-tab-test',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, TabsComponent, TabPanelComponent, ParagraphComponent, ProgressBarComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'04'" [showTabState]="true" [bgColor]="bgColor">
            <div tabContent>
                <app-tabs [orientation]="'horizontal'" [tabTriggers]="['Tab 1', 'Tab 2', 'Tab 3']" [bgColor]="bgColor">
                    <app-tab-panel>
                        <app-paragraph content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." modifier="normal" [bgColor]="bgColor">
                        </app-paragraph>
                    </app-tab-panel>
                    <app-tab-panel>
                        <app-paragraph content="Ut enim ad minim veniam, quis nostrud exercitation." modifier="bold" [bgColor]="bgColor"> </app-paragraph>
                    </app-tab-panel>
                    <app-tab-panel>
                        <app-paragraph content="Duis aute irure dolor in reprehenderit." modifier="italic" [bgColor]="bgColor"> </app-paragraph>
                    </app-tab-panel>
                </app-tabs>
            </div>

            <div rightContent class="flex flex-col space-y-8 w-full">
                <app-button variant="success" (onClick)="navigateToNext()"> Check tables </app-button>

                <div class="flex flex-col items-center space-y-2 w-full">
                    <app-progress-bar value="65" length="100%" class="relative w-full pt-12"> </app-progress-bar>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class TabTestComponent implements OnInit {
    title: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';

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
        this.router.navigate(['/table']);
    }
}
