export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface ButtonProps {
    variant?: ButtonVariant;
    className?: string;
}
