import { DialogSize, DialogStyles } from './dialog.types';

export function getDialogStyles(size: DialogSize): DialogStyles {
    const sizeClasses: Record<DialogSize, string> = {
        small: 'sm:max-w-lg sm:w-full m-5 sm:mx-auto',
        normal: 'md:max-w-2xl md:w-full m-3 md:mx-auto',
        large: 'lg:max-w-4xl lg:w-full m-3 lg:mx-auto',
    };

    return {
        overlay:
            'fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50',
        container: `flex flex-col bg-white rounded-2xl py-4 px-5 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-h-96 ${sizeClasses[size]} z-50`,
        header: {
            container: 'flex justify-between items-center pb-4 border-b border-gray-200',
            title: 'text-sm text-gray-900 font-medium',
        },
        content: 'overflow-y-auto pt-4 min-h-[100px]',
        footer: 'flex items-center justify-end pt-4 border-t border-gray-200',
        closeButton: 'block cursor-pointer hover:opacity-70 transition-opacity',
        footerButtons: {
            container: 'flex gap-3',
            primary: 'px-4 py-2 bg-blue-base text-white rounded-lg hover:bg-blue-dark transition-colors',
            secondary: 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors',
        },
    };
}
