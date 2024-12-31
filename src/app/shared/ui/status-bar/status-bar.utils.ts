import { StatusBarStyles } from './status-bar.types';

export function getStatusBarStyles(length?: string): StatusBarStyles {
    const containerWidth = length ? `w-[${length}]` : 'w-[20%]';

    return {
        container: `relative ${containerWidth}`,
        list: 'flex justify-between w-full mb-4',
        item: {
            base: 'w-4 h-4 transition-colors duration-300 font-semibold',
            active: 'text-blue-base',
            inactive: 'text-gray-200',
        },
    };
}

export function validateProgressValue(value: string): number {
    const numValue = parseInt(value, 10);
    return Math.min(Math.max(numValue, 0), 100);
}

export function calculateActiveStep(value: number, numOfSteps: number): number {
    // First step is always active
    if (value === 0) return 0;

    // Calculate step size
    const stepSize = 100 / (numOfSteps - 1);

    // Calculate active step based on progress value
    const activeStep = Math.ceil(value / stepSize);

    // For 100% progress, activate all steps
    if (value >= 99.9) {
        return numOfSteps - 1;
    }

    // Ensure the result is within bounds
    return Math.min(Math.max(activeStep, 0), numOfSteps - 1);
}
