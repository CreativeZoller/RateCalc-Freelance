import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent, TooltipComponent } from '@components/index';
import { ConfigurationService } from '@services/index';

@Component({
    selector: 'app-landing',
    templateUrl: 'landing.component.html',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, TooltipComponent],
})
export class LandingComponent implements OnInit {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    appSlogan: string = '';
    bgColor: BackgroundColor = 'blue';

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly configService: ConfigurationService
    ) {}

    ngOnInit() {
        this.initializePageSettings();
    }

    private initializePageSettings(): void {
        this.title = this.route.snapshot.title as string;
        this.subTitle = 'Fee Calculator';
        this.appName = this.configService.appTitle;
        this.appSlogan = this.configService.appSlogan;
    }

    navigateToCalculations() {
        this.router.navigate(['/living']);
    }
}
