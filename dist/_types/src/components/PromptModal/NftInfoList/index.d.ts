import React from 'react';
export interface INftInfoList {
    image?: string | null;
    collectionName?: string;
    nftName?: string;
    item?: string | number;
    priceTitle?: string;
    price?: string;
    usdPrice?: string;
    onClick?: <T>(params?: T) => void;
}
declare const _default: React.MemoExoticComponent<(props: INftInfoList) => import("react/jsx-runtime").JSX.Element>;
export default _default;
