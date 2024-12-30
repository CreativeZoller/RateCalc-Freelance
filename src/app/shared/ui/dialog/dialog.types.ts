export type DialogSize = 'small' | 'normal' | 'large';

export interface DialogHeader {
    title: string;
}

export interface DialogProps {
    size?: DialogSize;
    isOpen?: boolean;
    header?: DialogHeader;
    hasFooter?: boolean;
}

export interface DialogStyles {
    overlay: string;
    container: string;
    header: {
        container: string;
        title: string;
    };
    content: string;
    footer: string;
    closeButton: string;
    footerButtons: {
        container: string;
        primary: string;
        secondary: string;
    };
}
