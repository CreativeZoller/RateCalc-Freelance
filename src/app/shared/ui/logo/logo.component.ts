import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '@services/index';
import { BackgroundColor, styleConfigs } from '@layout/page-layout.types';

@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [CommonModule],
    template: ` <h2 [class]="getLogoClasses()">{{ content || appName }}</h2> `,
})
export class LogoComponent implements OnInit {
    @Input() content: string = '';
    @Input() bgColor: BackgroundColor = 'blue';
    appName: string = '';

    constructor(private configService: ConfigurationService) {}

    ngOnInit() {
        this.appName = this.configService.appTitle;
    }

    get styleConfig() {
        return styleConfigs[this.bgColor];
    }

    getLogoClasses(): string {
        return `text-2xl font-semibold mb-6 md:mt-4 ${this.styleConfig.text}`;
    }
}
