import React from 'react';
import { BatchDeListType, IListedNFTInfo } from 'contract/type';
import { INftSaleInfoItem } from 'api/types';
export declare const ApproveListingModal: React.FC<{
    nftSaleInfo: INftSaleInfoItem;
    itemsForSell?: number | undefined;
    listingPrice?: string | number | undefined;
    listingUSDPrice?: string | number | undefined;
    invalidList?: IListedNFTInfo[] | undefined;
    visible?: boolean | undefined;
    validType: BatchDeListType;
    onCancel?: (() => void) | undefined;
    onRetry?: (() => void) | undefined;
    onReEdit?: (() => void) | undefined;
} & import("@ebay/nice-modal-react").NiceModalHocProps>;
