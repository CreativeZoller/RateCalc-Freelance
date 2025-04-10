import { TabOrientation, TabStyles } from './tabs.types';
import { BackgroundColor, styleConfigs } from '@layout/page-layout.types';

export function getTabStyles(orientation: TabOrientation, bgColor: BackgroundColor): TabStyles {
    const isGray = bgColor === 'gray';

    return {
        container: orientation === 'horizontal' ? 'flex flex-col h-full w-full gap-2' : 'flex h-full w-full gap-2',

        tabList:
            orientation === 'horizontal'
                ? 'flex grid grid-flow-col justify-stretch border-b-2 border-gray-200 space-x-3 transition-all duration-300 -mb-px'
                : 'flex flex-col space-y-1 border-r-2 border-gray-200',

        tabTrigger: {
            base: 'inline-block py-4 px-6 font-medium border-b-4 border-transparent uppercase',
            active: isGray
                ? 'border-b-primaryBlue text-primaryGray-link tablink whitespace-nowrap'
                : 'border-b-primaryBlue-link text-primaryBlue-link tablink whitespace-nowrap',
            inactive: isGray
                ? 'text-text hover:text-primaryGray-link tablink whitespace-nowrap'
                : 'text-slate-200 hover:text-primaryBlue-link tablink whitespace-nowrap',
        },

        content: 'flex-1 h-full',
    };
}
