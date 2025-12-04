import { FilterKeyEnum, FilterType, SourceItemType } from 'constants/collection.ts';
import BigNumber from 'bignumber.js';
export declare enum CollectionsStatus {
    'Buy Now' = 1,
    'My Items' = 2,
    'On Auction' = 3,
    'Has Offers' = 4
}
export type CheckboxItemType = {
    key: FilterKeyEnum;
    title: string;
    maxCount?: number;
    decimals?: number;
    AMOUNT_LENGTH?: number;
    type: FilterType.Checkbox;
    showClearAll?: boolean;
    data: SourceItemType[];
};
export type RangeItemType = {
    key: FilterKeyEnum;
    title: string;
    maxCount?: number;
    AMOUNT_LENGTH?: number;
    decimals?: number;
    type: FilterType.Range;
    showClearAll?: boolean;
    data?: SourceItemType[];
};
export type SearchCheckBoxItemType = {
    key: FilterKeyEnum;
    title: string;
    type: FilterType.SearchCheckbox;
    showClearAll?: boolean;
    data?: SourceItemType[];
    maxCount?: number;
    AMOUNT_LENGTH?: number;
    decimals?: number;
};
export type TagItemType = {
    label: string;
    type: string;
    value?: string | number;
    disabled?: boolean;
};
export interface IFilterSelect {
    [key: string]: any;
}
export declare const getFilter: (filterSelect: IFilterSelect, isActivity?: boolean) => {
    [key: string]: any;
};
export declare function formatTokenPrice(price: number | BigNumber | string, toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
}): string;
export declare const getTagList: (filterSelect: IFilterSelect, search: string) => TagItemType[];
export declare const getDefaultFilter: (ChainId: string) => IFilterSelect;
export declare function getFilterFromSearchParams(filterParamStr: string | null): {
    [key: string]: {
        type: FilterType;
        data: Array<{
            label: string;
            value: string;
        }>;
    };
};
export declare const getFilterList: (type: string, ChainId: string) => Array<CheckboxItemType | RangeItemType | SearchCheckBoxItemType>;
export declare function formatUSDPrice(price: number | BigNumber | string, toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
}): string;
export declare const handlePlurality: (num: number, noun: string) => string;
