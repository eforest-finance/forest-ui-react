import React from 'react';
export interface INftInfoListCard {
    image?: string | undefined;
    collectionName?: string;
    nftName?: string;
    item?: string;
    priceTitle?: string;
    price?: string | number;
    usdPrice?: string | number;
    imageSizeType?: 'cover' | 'contain';
}
declare const _default: React.MemoExoticComponent<(props: INftInfoListCard) => import("react/jsx-runtime").JSX.Element>;
export default _default;
