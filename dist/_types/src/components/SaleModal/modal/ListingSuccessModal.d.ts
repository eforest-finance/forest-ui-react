import React from 'react';
export declare const ListingSuccessModal: React.FC<{
    nftInfo: INftInfo | null;
    explorerUrl?: string | undefined;
    onViewMyListing?: (() => void) | undefined;
} & import("@ebay/nice-modal-react").NiceModalHocProps>;
