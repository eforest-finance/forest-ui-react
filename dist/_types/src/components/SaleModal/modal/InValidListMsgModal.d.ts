import React from 'react';
import { BatchDeListType, IListedNFTInfo } from 'contract/type';
import { INftInfo } from 'types/nftTypes';
export declare const InValidListMsgModal: React.FC<{
    nftInfo: INftInfo | null;
    invalidList?: IListedNFTInfo[] | undefined;
    visible?: boolean | undefined;
    validType: BatchDeListType;
    onRetry?: (() => void) | undefined;
} & import("@ebay/nice-modal-react").NiceModalHocProps>;
