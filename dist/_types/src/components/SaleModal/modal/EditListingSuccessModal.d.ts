import React from 'react';
export declare const EditListingSuccessModal: React.FC<{
    nftInfo: INftInfo | null;
    explorerUrl?: string | undefined;
    onViewMyListing?: (() => void) | undefined;
    status?: any;
} & import("@ebay/nice-modal-react").NiceModalHocProps>;
