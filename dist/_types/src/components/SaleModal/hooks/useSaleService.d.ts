/// <reference types="react" />
import { IPrice } from './useSetPrice';
import { IListedNFTInfo } from 'contract/type.ts';
import { IDurationData } from './useDuration';
import { NiceModalHandler } from '@ebay/nice-modal-react';
export declare const ListingMessage: {
    title: string;
    portkey: {
        title: any;
        message: any;
    };
    default: {
        title: any;
        message: string;
    };
};
export declare function getDefaultDataByNftInfoList(infoList?: IListedNFTInfo[], showPrevious?: boolean): {
    listingPrice: {
        price: number;
        token: {
            symbol: string;
            tokenId: string;
            decimals: number;
        };
    };
    duration: {
        type: string;
        value: Date;
        showPrevious: boolean | undefined;
    };
    itemsForSell: number;
} | undefined;
export declare function useGetListItemsForSale(nftInfo: INftInfo): {
    maxQuantity: number;
    listItems: number;
    listedNFTInfoList: IListedNFTInfo[];
};
export declare function useSaleService(nftInfo: INftInfo, sellModalInstance: NiceModalHandler, mode: string, defaultData: any): {
    nftSaleInfo: unknown;
    listingBtnDisable: boolean;
    listingPrice: IPrice;
    setListingPrice: import("react").Dispatch<import("react").SetStateAction<IPrice>>;
    listItems: number;
    setDuration: import("react").Dispatch<import("react").SetStateAction<IDurationData>>;
    onCompleteListingHandler: () => Promise<void>;
    listingUSDPrice: number | undefined;
    itemsForSell: number;
    setItemsForSell: import("react").Dispatch<import("react").SetStateAction<number>>;
    availableItemForSell: number;
};
