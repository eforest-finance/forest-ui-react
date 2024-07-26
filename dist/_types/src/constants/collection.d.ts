import { ReactNode } from 'react';
export declare enum FilterType {
    Checkbox = "Checkbox",
    Range = "Range",
    SearchCheckbox = "SearchCheckbox",
    Single = "Single",
    Multiple = "Multiple"
}
export declare enum BoxSizeEnum {
    large = "large",
    small = "small",
    details = "details"
}
export type SourceItemType = {
    value: string | number;
    label: string;
    disabled?: boolean;
    extra?: string | number;
};
export declare const SORT_BY = "sorting";
export type SingleItemType = {
    key: string;
    title: string;
    type: FilterType.Single;
    show?: string;
    data: SourceItemType[];
};
export declare const dropDownCollectionsMenu: SingleItemType;
declare enum FilterKeyEnum {
    Status = "Status",
    Chain = "Chain",
    Symbol = "Symbol",
    Price = "Price",
    Generation = "Generation",
    Traits = "Traits",
    ActivityType = "ActivityType",
    Rarity = "Rarity",
    Mine = "Mine",
    Collections = "Collections"
}
declare enum SymbolTypeEnum {
    FT = 0,
    NFT = 1
}
declare enum CollectionsStatus {
    'Buy Now' = 1,
    'My Items' = 2,
    'On Auction' = 3,
    'Has Offers' = 4
}
declare const AcitvityItemArray: string[];
export type RangeType = {
    min: string;
    max: string;
};
export interface CheckboxChoiceProps {
    dataSource?: CheckboxItemType;
    defaultValue?: SourceItemType[];
    onChange?: (val: ItemsSelectSourceType) => void;
    clearAll?: () => void;
    showSelectAll?: boolean;
}
export interface RangeInputProps {
    defaultValue?: RangeType[];
    prefixIcon?: ReactNode;
    decimals: number;
    errorMessage?: string;
    minStatus?: 'warning' | 'error' | '';
    maxStatus?: 'warning' | 'error' | '';
    maxCount?: number;
    AMOUNT_LENGTH?: number;
    onValueChange?: (min: number | string, max: number | string) => void;
}
export interface RangeSelectProps {
    dataSource?: RangeItemType;
    maxCount?: number;
    decimals?: number;
    AMOUNT_LENGTH?: number;
    defaultValue?: RangeType[];
    onChange?: (val: ItemsSelectSourceType) => void;
}
export declare const enum emptyEnum {
    nft = "nft",
    collection = "collection"
}
export declare enum SupportedChainId {
    MAINNET = 1,
    KOVAN = 42,
    BSC_MAINNET = 56,
    BSC_TESTNET = 97,
    HECO_MAINNET = 128,
    HECO_TESTNET = 256,
    OEC_MAINNET = 66,
    OEC_TESTNET = 65,
    POLYGON_MAINNET = 137,
    POLYGON_TESTNET = 80001
}
export declare enum SupportedELFChainId {
    MAIN_NET = "AELF",
    TDVV_NET = "tDVV",
    TDVW_NET = "tDVW"
}
export type NativeToken = {
    name: string;
    symbol: string;
    decimals: number;
};
export { FilterKeyEnum, SymbolTypeEnum, CollectionsStatus, AcitvityItemArray };
