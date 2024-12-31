import { Injectable, signal } from '@angular/core';

/**
 * Interface representing form data structure
 */
interface FormData {
    formId: string;
    controls: { [key: string]: any };
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
     * Creates a new form data entry
     * @param {string} formId - Unique identifier for the form
     * @param {Object} controls - Form control values
     * @returns {void}
     */
    createFormData(formId: string, controls: { [key: string]: any }): void {
        this.formSignal.update((forms) => [...forms, { formId, controls }]);
    }

    /**
     * Updates existing form data
     * @param {string} formId - Identifier of form to update
     * @param {Object} controls - New form control values
     * @returns {void}
     */
    updateFormData(formId: string, controls: { [key: string]: any }): void {
        this.formSignal.update((forms) => forms.map((form) => (form.formId === formId ? { ...form, controls } : form)));
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
     * Deletes form data by ID
     * @param {string} formId - Identifier of form to delete
     * @returns {void}
     */
    deleteFormData(formId: string): void {
        this.formSignal.update((forms) => forms.filter((form) => form.formId !== formId));
    }

    /**
     * Clears all stored form data
     * @returns {void}
     */
    clearAllData(): void {
        this.formSignal.set([]);
    }

    /**
     * Gets all stored form data
     * @returns {FormData[]} Array of all form data
     */
    getAllFormData(): FormData[] {
        return this.formSignal();
    }
}
