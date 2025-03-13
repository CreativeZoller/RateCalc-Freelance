import { DialogSize, DialogStyles } from './dialog.types';

export function getDialogStyles(size: DialogSize): DialogStyles {
    const sizeClasses: Record<DialogSize, string> = {
        small: 'w-[90%] md:w-[70%] lg:w-[30%] lg:max-w-[550px] lg:mx-auto',
        normal: 'w-[90%] md:w-[80%] lg:w-[50%] lg:max-w-[550px] lg:mx-auto',
        large: 'w-[90%] md:w-[90%] lg:w-[60%] lg:max-w-[550px] lg:mx-auto',
    };

    return {
        overlay:
            'fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50',
        container: `flex flex-col rounded-2xl py-4 px-5 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-h-96 ${sizeClasses[size]} z-50 bg-gradient-to-br from-white to-gray-100`,
        header: {
            container: 'flex justify-between items-center pb-4 border-b border-gray-200',
            title: 'text-gray-900 font-medium',
        },
        content: 'overflow-y-auto pt-4 min-h-[100px]',
        footer: 'flex items-center justify-end pt-4 border-t border-gray-200',
        closeButton: 'block cursor-pointer hover:opacity-70 transition-opacity',
        footerButtons: {
            container: 'flex gap-3',
            primary: 'px-4 py-2 bg-blue-base text-white font-semibold rounded-lg hover:bg-blue-dark transition-colors',
            secondary: 'px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors',
        },
    };
}
