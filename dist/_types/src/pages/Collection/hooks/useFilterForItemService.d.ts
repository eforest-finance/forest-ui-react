/// <reference types="react" />
import { IFilterSelect } from '../util';
export declare function useFilterForItemService(nftCollectionId: string): {
    traitsInfo: unknown;
    generationInfos: unknown;
    rarityInfos: {
        items: {
            rarity: string;
        }[];
    } | undefined;
    filterList: (import("../util").CheckboxItemType | import("../util").RangeItemType | import("../util").SearchCheckBoxItemType)[];
    filterSelect: IFilterSelect;
    setFilterSelect: import("react").Dispatch<import("react").SetStateAction<IFilterSelect>>;
    onFilterChange: (val: any) => void;
    clearAll: () => void;
    formatFilterToParams: (filterSelect: IFilterSelect, isActivity?: boolean | undefined) => {
        [key: string]: any;
    };
};
