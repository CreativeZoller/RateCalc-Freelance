/**
 * A paragraph component that renders text content with different text styles and modifiers.
 * Supports various text modifications like bold, italic, and underlined, along with background color theming.
 *
 * @component
 * @example
 * // Basic paragraph
 * <app-paragraph
 *   content="This is a normal paragraph"
 *   modifier="normal">
 * </app-paragraph>
 *
 * // Bold paragraph with custom background
 * <app-paragraph
 *   content="Important information"
 *   modifier="bold"
 *   [bgColor]="'gray'">
 * </app-paragraph>
 *
 * // Italic paragraph
 * <app-paragraph
 *   content="Emphasized text"
 *   modifier="italic"
 *   [bgColor]="'blue'">
 * </app-paragraph>
 *
 * // Underlined paragraph
 * <app-paragraph
 *   content="Highlighted content"
 *   modifier="underlined">
 * </app-paragraph>
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundColor, styleConfigs } from '@layout/page-layout.types';

type ParagraphModifier = 'bold' | 'italic' | 'underlined' | 'normal';

@Component({
    selector: 'app-paragraph',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p [class]="getStyleClasses()">
            {{ content }}
        </p>
    `,
})
export class ParagraphComponent {
    @Input() content: string = '';
    @Input() modifier: ParagraphModifier = 'normal';
    @Input() bgColor: BackgroundColor = 'blue';

    get styleConfig() {
        return styleConfigs[this.bgColor];
    }

    getStyleClasses(): string {
        const modifierClasses: Record<ParagraphModifier, string> = {
            bold: 'font-bold',
            italic: 'italic',
            underlined: 'underline',
            normal: '',
        };

        return `mb-4 ${this.styleConfig.text} ${modifierClasses[this.modifier]}`.trim();
    }
}
