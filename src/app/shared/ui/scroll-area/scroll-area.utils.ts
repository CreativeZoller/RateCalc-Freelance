import { ScrollAreaStyles } from './scroll-area.types';
import { BackgroundColor } from '@layout/page-layout.types';

export function getScrollAreaStyles(bgColor: BackgroundColor): ScrollAreaStyles {
    const isGray = bgColor === 'gray';

    return {
        base: 'h-[50%] w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
        scrollbar: {
            track: 'scrollbar-track-transparent',
            thumb: {
                default: isGray ? 'scrollbar-thumb-gray-base' : 'scrollbar-thumb-slate-200/80',
                hover: isGray ? 'hover:scrollbar-thumb-gray-base/90' : 'hover:scrollbar-thumb-slate-200/90',
                active: isGray ? 'active:scrollbar-thumb-gray-dark' : 'active:scrollbar-thumb-slate-300',
            },
        },
    };
}
