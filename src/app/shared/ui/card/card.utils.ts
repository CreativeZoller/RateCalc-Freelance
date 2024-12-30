import { CardStyles } from './card.types';
import { BackgroundColor } from '@layout/page-layout.types';

export function getCardStyles(bgColor?: BackgroundColor): CardStyles {
    switch (bgColor) {
        case 'gray':
            return {
                container: 'rounded-lg border border-gray-light bg-white text-gray-base shadow-sm',
                header: {
                    title: 'text-blue-base',
                    description: 'text-gray-dark',
                },
                content: 'text-gray-base',
                footer: 'border-t border-gray-light',
            };

        case 'blue':
            return {
                container: 'rounded-lg border border-white bg-slate-100 text-yellow-base shadow-sm',
                header: {
                    title: 'text-yellow-base',
                    description: 'text-gray-dark',
                },
                content: 'text-slate-200',
                footer: 'border-t border-white',
            };

        default:
            return {
                container: 'rounded-lg border border-gray-light bg-white text-text-default shadow-sm',
                header: {
                    title: 'text-gray-base',
                    description: 'text-gray-dark/80',
                },
                content: 'text-gray-base',
                footer: 'border-gray-light pt-0',
            };
    }
}
