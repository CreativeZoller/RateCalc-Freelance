import { Injectable, signal } from '@angular/core';

/**
 * Interface representing form data structure
 */
interface FormData {
    formId: string;
    controls: Record<string, unknown>;
}

/**
 * Service for managing form data using Angular signals
 * @class FormSignalService
 *
 * @description
 * This service handles the storage and management of form data using Angular signals.
 * It provides methods for creating, updating, and deleting form data, as well as
 * clearing all stored data. Form data is stored locally and is not shared between sessions.
 */
@Injectable({
    providedIn: 'root',
})
export class FormSignalService {
    /** Signal storing all form data */
    private formSignal = signal<FormData[]>([]);

    /**
     * Creates a new form entry if it does not exist, otherwise updates it.
     * @param {string} formId - Unique identifier for the form
     * @param {Record<string, unknown>} controls - Form control values
     */
    createOrUpdateFormData(formId: string, controls: Record<string, unknown>): void {
        this.formSignal.update((forms) => {
            const existingIndex = forms.findIndex((form) => form.formId === formId);
            if (existingIndex !== -1) {
                // Update existing form
                const updatedForms = structuredClone(forms);
                updatedForms[existingIndex].controls = controls;
                return updatedForms;
            }
            // Create new form entry
            return [...forms, { formId, controls }];
        });
    }

    /**
     * Retrieves form data by ID
     * @param {string} formId - Form identifier to retrieve
     * @returns {FormData | undefined} The form data or undefined if not found
     */
    getFormData(formId: string): FormData | undefined {
        return this.formSignal().find((form) => form.formId === formId);
    }

    /**
     * Deletes a specific form by ID
     * @param {string} formId - Identifier of form to delete
     */
    deleteFormData(formId: string): void {
        this.formSignal.update((forms) => forms.filter((form) => form.formId !== formId));
    }

    /**
     * Clears all stored form data
     */
    clearAllData(): void {
        this.formSignal.set([]);
    }

    /**
     * Resets all stored forms to empty controls while preserving form IDs.
     */
    resetAllForms(): void {
        this.formSignal.update((forms) => forms.map((form) => ({ formId: form.formId, controls: {} })));
    }

    /**
     * Gets all stored form data
     * @returns {FormData[]} Array of all form data
     */
    getAllFormData(): FormData[] {
        return this.formSignal();
    }
}
