import React from 'react';
export declare const ApproveCancelListingModal: React.FC<{
    itemsNumberForDel?: number | undefined;
    listingsNumber?: number | undefined;
    data?: any;
    isBatch?: boolean | undefined;
    handle?: (() => Promise<void>) | undefined;
} & import("@ebay/nice-modal-react").NiceModalHocProps>;
