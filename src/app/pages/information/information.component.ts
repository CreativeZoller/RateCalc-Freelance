import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageLayoutComponent } from '@layout/page-layout.component';
import { BackgroundColor } from '@layout/page-layout.types';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/form-elements/input/input.component';
import { CheckboxComponent } from '@components/form-elements/checkbox/checkbox.component';
import { ConfigurationService, ToastService } from '@services/index';
import { ExpenseParagraph } from 'app/types';

@Component({
    selector: 'app-information',
    templateUrl: 'information.component.html',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent, ButtonComponent, InputComponent, CheckboxComponent, ReactiveFormsModule],
})
export class InformationComponent {
    title: string = '';
    subTitle: string = '';
    appName: string = '';
    bgColor: BackgroundColor = 'blue';
    paragraphs: ExpenseParagraph[] = [
        { content: 'Become part of a thriving community of freelancers and independent professionals.', modifier: 'normal' },
        { content: 'Gain exclusive access to valuable resources, expert insights, and industry best practices.', modifier: 'normal' },
        { content: 'Engage and network with like-minded professionals in your field.', modifier: 'normal' },
    ];

    subscribeForm: FormGroup;
    isSubmitting = false;

    constructor(
        private readonly configService: ConfigurationService,
        private readonly fb: FormBuilder,
        private readonly toastService: ToastService,
        private readonly http: HttpClient
    ) {
        this.initializePageSettings();
        this.subscribeForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            consent: [false, [Validators.requiredTrue]],
            'e-mail': [''],
        });
    }

    private initializePageSettings(): void {
        this.title = 'Get Involved';
        this.subTitle = 'Stay Updated';
        this.appName = this.configService.appTitle;
    }

    getControl(name: string): FormControl {
        return this.subscribeForm.get(name) as FormControl;
    }

    private addSubscriber(subscriberData: { email: string; firstName: string; lastName: string }) {
        const url = 'https://api.brevo.com/v3/contacts';
        const apiKey = process.env['brevoApiKey'] || '';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'api-key': apiKey,
        });

        const body = {
            email: subscriberData.email,
            attributes: {
                FIRSTNAME: subscriberData.firstName,
                LASTNAME: subscriberData.lastName,
            },
            listIds: [2],
            updateEnabled: false,
        };

        return this.http.post(url, body, { headers });
    }

    async onSubmit() {
        if (this.subscribeForm.valid && !this.isSubmitting) {
            // Check honeypot field
            const honeypot = this.subscribeForm.get('e-mail')?.value;
            if (honeypot) {
                console.log('Honeypot field filled - likely spam');
                this.toastService.show({
                    title: 'Error',
                    description: 'Form submission failed',
                });
                return;
            }

            this.isSubmitting = true;
            const { email, firstName, lastName } = this.subscribeForm.value;

            try {
                const apiKey = process.env['brevoApiKey'] || '';
                if (!apiKey) {
                    throw new Error('API key not configured');
                }

                this.addSubscriber({ email, firstName, lastName }).subscribe({
                    next: () => {
                        this.toastService.show({
                            title: 'Success!',
                            description: 'Thank you for subscribing to our newsletter!',
                        });
                        this.subscribeForm.reset();
                    },
                    error: (error) => {
                        console.error('Subscription error:', error);
                        this.toastService.show({
                            title: 'Error',
                            description: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
                        });
                    },
                    complete: () => {
                        this.isSubmitting = false;
                    },
                });
            } catch (error) {
                console.error('Subscription error:', error);
                this.toastService.show({
                    title: 'Error',
                    description: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
                });
                this.isSubmitting = false;
            }
        } else {
            // Show validation errors
            Object.keys(this.subscribeForm.controls).forEach((key) => {
                const control = this.subscribeForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });

            if (!this.subscribeForm.get('consent')?.value) {
                this.toastService.show({
                    title: 'Error',
                    description: 'Please accept the privacy statement to continue.',
                });
            }
        }
    }
}
