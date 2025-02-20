import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent } from '@components/button/button.component';
import { ConfigurationService } from '@services/index';
import { ExpenseParagraph } from 'app/types/';

@Component({
    selector: 'app-error',
    templateUrl: 'error.component.html',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent],
})
export class ErrorComponent implements OnInit {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    paragraphs: ExpenseParagraph[] = [{ content: 'Sorry, we couldn’t find the page you’re looking for.', modifier: 'normal' }];

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
        this.appName = this.configService.appTitle;
    }

    goBack() {
        this.router.navigate(['/landing']);
    }
}
