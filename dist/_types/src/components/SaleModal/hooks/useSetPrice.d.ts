import { ReactNode } from 'react';
import { InputStatus } from 'antd/lib/_util/statusUtils';
export declare const AMOUNT_LENGTH = 10;
export interface ITokenOfPrice {
    symbol: string;
    tokenId: string;
    decimals: number;
    icon?: string;
}
export interface IPrice {
    token?: ITokenOfPrice;
    price?: number | string;
}
export interface ISetPriceProps {
    onChange?: (price: IPrice) => void;
    editMode?: boolean;
    title?: string;
    tooltip?: string;
    floorPrice?: number;
    lastSalePrice?: number;
    bestOfferPrice?: number;
    defaultPrice?: number | string;
    className?: string;
    errorTip?: string | ReactNode;
    checkValid?: (price: number) => boolean;
    placeholder?: string;
    valid?: InputStatus;
    defaultErrorTip?: string;
}
export declare function useSetPriceService({ onChange, defaultPrice, checkValid }: ISetPriceProps): {
    inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => string | void;
    price: string | number | undefined;
    setPrice: import("react").Dispatch<import("react").SetStateAction<string | number | undefined>>;
    token: ITokenOfPrice;
    setToken: import("react").Dispatch<import("react").SetStateAction<ITokenOfPrice>>;
    status: "" | "error" | undefined;
};
