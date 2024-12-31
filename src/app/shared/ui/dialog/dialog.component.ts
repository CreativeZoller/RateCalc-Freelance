/**
 * A modal dialog component with header, content, and footer sections.
 * Supports different sizes and customizable layout with two-way binding for open state.
 * Features primary and secondary action buttons in the footer.
 *
 * @component
 * @example
 * // Basic dialog with two-way binding
 * <app-dialog
 *   [(isOpen)]="showDialog"
 *   [header]="{ title: 'Welcome' }">
 *   <div dialogContent>
 *     <p>Dialog content goes here</p>
 *   </div>
 * </app-dialog>
 *
 * // Dialog with footer actions
 * <app-dialog
 *   [(isOpen)]="showConfirm"
 *   [header]="{ title: 'Confirm Action' }"
 *   [hasFooter]="true"
 *   (secondaryAction)="handleSecondaryAction($event)">
 *   <div dialogContent>
 *     <p>Are you sure you want to proceed?</p>
 *   </div>
 * </app-dialog>
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSize, DialogProps, DialogHeader } from './dialog.types';
import { getDialogStyles } from './dialog.utils';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isOpen) {
            <div class="relative">
                <!-- Overlay -->
                <div [class]="styles.overlay" (click)="closeDialog()" role="presentation"></div>

                <!-- Dialog -->
                <div role="dialog" aria-modal="true" [class]="styles.container">
                    <!-- Header -->
                    <div *ngIf="header" [class]="styles.header.container">
                        <h4 [class]="styles.header.title">{{ header.title }}</h4>
                        <button type="button" [class]="styles.closeButton" (click)="closeDialog()" aria-label="Close">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Content -->
                    <div [class]="styles.content">
                        <ng-content select="[dialogContent]"></ng-content>
                    </div>

                    <!-- Footer -->
                    <div *ngIf="hasFooter" [class]="styles.footer">
                        <div [class]="styles.footerButtons.container">
                            <button [class]="styles.footerButtons.secondary" (click)="handleSecondaryAction()">Cancel</button>
                            <button [class]="styles.footerButtons.primary" (click)="closeDialog()">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    `,
})
export class DialogComponent implements DialogProps {
    @Input() size: DialogSize = 'normal';
    @Input() isOpen: boolean = false;
    @Input() header?: DialogHeader;
    @Input() hasFooter: boolean = false;
    @Output() isOpenChange = new EventEmitter<boolean>();
    @Output() secondaryAction = new EventEmitter<number>();

    get styles() {
        return getDialogStyles(this.size);
    }

    closeDialog() {
        this.isOpenChange.emit(false);
    }

    handleSecondaryAction() {
        const randomValue = Math.floor(Math.random() * 100) + 1;
        this.secondaryAction.emit(randomValue);
        this.closeDialog();
    }
}
