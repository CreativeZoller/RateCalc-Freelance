import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { ButtonComponent } from '@components/button/button.component';
import { ToastService } from '@components/toast/toast.service';
import { ToastComponent } from '@components/toast/toast.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { ListGroupComponent } from '@components/list-group/list-group.component';
import { ConfigService } from '@services/config.service';
import { BackgroundColor } from '@layout/page-layout.types';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, ToastComponent, DialogComponent, ListGroupComponent],
    template: `
        <app-page-layout [title]="title" [appName]="appName" [stepNumber]="'42'" [bgColor]="bgColor">
            <div rightContent class="flex flex-col items-center gap-4">
                <p class="text-xl text-gray-700">The page you're looking for doesn't exist.</p>

                <div class="flex gap-4">
                    <app-button variant="secondary" (onClick)="goBack()"> Go Back </app-button>

                    <app-button variant="primary" (onClick)="showListDialog = true"> Show List </app-button>
                </div>
            </div>
        </app-page-layout>

        <app-dialog
            [(isOpen)]="showListDialog"
            [size]="'large'"
            [header]="{ title: 'Sample Items List' }"
            [hasFooter]="true"
            (secondaryAction)="handleRandomValue($event)">
            <div dialogContent>
                <app-list-group [headline]="'Generated Items'" [type]="'normal'" [items]="listItems" [bgColor]="'gray'"> </app-list-group>
            </div>
        </app-dialog>

        <app-toast></app-toast>
    `,
})
export class ErrorComponent implements OnInit {
    title: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'gray';
    showListDialog: boolean = false;
    listItems = Array.from({ length: 50 }, (_, i) => ({
        content: `Item ${i + 1} - ${this.generateRandomText()}`,
        href: undefined,
    }));

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        this.title = this.route.snapshot.title as string;
        this.appName = this.configService.appTitle;

        this.toastService.show({
            title: 'Calculations finished',
            description: 'All previously entered values are now removed, only summarization exists now.',
        });
    }

    goBack() {
        this.router.navigate(['/landing']);
    }

    handleRandomValue(value: number) {
        console.log('Random value from dialog:', value);
    }

    private generateRandomText(): string {
        const texts = ['Important task to review', 'Pending approval request', 'Document needs verification', 'Update required', 'Action item pending'];
        return texts[Math.floor(Math.random() * texts.length)];
    }
}
