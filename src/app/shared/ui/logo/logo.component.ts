/**
 * A logo component that displays the application name or custom content.
 * Supports different background colors and automatically falls back to app name if no content is provided.
 *
 * @component
 * @example
 * // Basic usage with default app name
 * <app-logo></app-logo>
 *
 * // Custom content with specific background
 * <app-logo
 *   content="Custom Brand"
 *   [bgColor]="'gray'">
 * </app-logo>
 *
 * // Using in header/navigation
 * <header>
 *   <app-logo
 *     [content]="headerTitle"
 *     [bgColor]="'blue'">
 *   </app-logo>
 * </header>
 */
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
        return `text-2xl font-semibold mb-6 ${this.styleConfig.text}`;
    }
}
