export declare enum PriceTypeEnum {
    BUY = 1,
    BUY721 = 2,
    MAKEOFFER = 3,
    MAKEOFFER721 = 4,
    DEAL = 5
}
export default function PriceInfo(props: {
    nftInfo?: INftInfo;
    quantity: number | string;
    price: string | number;
    convertPrice: string | number;
    type: PriceTypeEnum;
}): import("react/jsx-runtime").JSX.Element;
