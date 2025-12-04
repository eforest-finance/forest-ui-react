import { FilterType, SourceItemType } from 'constants/collection';
export type SingleItemType = {
    key: string;
    title: string;
    type: FilterType.Single;
    show?: string;
    data: SourceItemType[];
};
export type MultipleItemType = {
    key: string;
    title: string;
    type: FilterType.Multiple;
    show?: string;
    data: SourceItemType[];
};
export interface ITraitInfo {
    id: string;
    key: string;
    value: string;
    itemsCount: number;
    allItemsCount: number;
    itemFloorPrice: number;
    itemFloorPriceToken: {
        chainId: Chain;
        address: string;
        symbol: string;
        decimals: number;
        id: string;
    };
}
