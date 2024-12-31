import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent } from '@components/button/button.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { TabPanelComponent } from '@components/tabs/tab-panel.component';
import { ParagraphComponent } from '@components/paragraph/paragraph.component';
import { ProgressBarComponent } from '@components/progress-bar/progress-bar.component';
import { SelectComponent } from '@components/form-elements/select/select.component';
import { SelectData } from '@components/form-elements/select/select.types';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-tab-test',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, TabsComponent, TabPanelComponent, ParagraphComponent, ProgressBarComponent, SelectComponent],
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

            <div rightContent class="flex flex-col space-y-8 w-full h-full">
                <form class="space-y-6">
                    <div class="flex gap-4 relative">
                        <app-select size="half" label="Practice Type" [data]="practiceTypes"> </app-select>
                        <app-select size="half" label="Specialty" [data]="specialties" [required]="true"> </app-select>
                    </div>

                    <div class="relative">
                        <app-select size="full" label="Select Country and City" [data]="countriesAndCities"> </app-select>
                    </div>

                    <div class="relative">
                        <app-select size="full" label="Select Multiple Cities" [data]="allCities" [multiselect]="true"> </app-select>
                    </div>
                </form>

                <app-button variant="success" fontWeight="semibold" (onClick)="navigateToNext()"> Check tables </app-button>

                <div class="flex flex-col items-center space-y-2 w-full">
                    <app-progress-bar length="100%" value="65" [showLabel]="true" class="relative w-full pt-12"> </app-progress-bar>
                </div>
            </div>
        </app-page-layout>
    `,
})
export class TabTestComponent implements OnInit {
    title: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';

    practiceTypes: SelectData[] = [
        { label: 'Solo Practice', value: 'solo' },
        { label: 'Group Practice', value: 'group' },
        { label: 'Hospital-Owned', value: 'hospital' },
    ];

    specialties: SelectData[] = [
        { label: 'Family Medicine', value: 'family' },
        { label: 'Internal Medicine', value: 'internal' },
        { label: 'Pediatrics', value: 'pediatrics' },
    ];

    countriesAndCities: SelectData[] = [
        { label: 'New York City (United States)', value: 'nyc' },
        { label: 'Los Angeles (United States)', value: 'la' },
        { label: 'Chicago (United States)', value: 'chi' },
        { label: 'Houston (United States)', value: 'hou' },
        { label: 'London (United Kingdom)', value: 'lon' },
        { label: 'Birmingham (United Kingdom)', value: 'bir' },
        { label: 'Manchester (United Kingdom)', value: 'man' },
        { label: 'Glasgow (United Kingdom)', value: 'gla' },
        { label: 'Tokyo (Japan)', value: 'tok' },
        { label: 'Yokohama (Japan)', value: 'yok' },
        { label: 'Osaka (Japan)', value: 'osa' },
        { label: 'Nagoya (Japan)', value: 'nag' },
        { label: 'Berlin (Germany)', value: 'ber' },
        { label: 'Hamburg (Germany)', value: 'ham' },
        { label: 'Munich (Germany)', value: 'mun' },
        { label: 'Cologne (Germany)', value: 'col' },
        { label: 'Paris (France)', value: 'par' },
        { label: 'Marseille (France)', value: 'mar' },
        { label: 'Lyon (France)', value: 'lyo' },
        { label: 'Toulouse (France)', value: 'tou' },
        { label: 'Toronto (Canada)', value: 'tor' },
        { label: 'Montreal (Canada)', value: 'mon' },
        { label: 'Vancouver (Canada)', value: 'van' },
        { label: 'Calgary (Canada)', value: 'cal' },
        { label: 'Sydney (Australia)', value: 'syd' },
        { label: 'Melbourne (Australia)', value: 'mel' },
        { label: 'Brisbane (Australia)', value: 'bri' },
        { label: 'Perth (Australia)', value: 'per' },
        { label: 'Madrid (Spain)', value: 'mad' },
        { label: 'Barcelona (Spain)', value: 'bcn' },
        { label: 'Valencia (Spain)', value: 'val' },
        { label: 'Seville (Spain)', value: 'sev' },
    ];

    allCities: SelectData[] = [...this.countriesAndCities];

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
