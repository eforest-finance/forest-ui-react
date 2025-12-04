import { IBatchBuyNowParams, IContractError, IContractOptions, IGetTotalEffectiveListedNFTAmountParams, IGetTotalOfferAmountParams, IListWithFixedPriceParams, IListedNFTInfo, ISendResult } from './type';
export declare const GetTotalOfferAmount: (params: IGetTotalOfferAmountParams, options?: IContractOptions) => Promise<IContractError & {
    allowance: number;
    totalAmount: number;
}>;
export declare const BatchBuyNow: (params: IBatchBuyNowParams, options?: IContractOptions) => Promise<IContractError & ISendResult>;
export declare const GetListedNFTInfoList: (params: {
    symbol: string;
    owner: string;
}, options?: IContractOptions) => Promise<IContractError & {
    value: IListedNFTInfo[];
}>;
export declare const GetTotalEffectiveListedNFTAmount: (params: IGetTotalEffectiveListedNFTAmountParams, options?: IContractOptions) => Promise<IContractError & {
    allowance: number;
    totalAmount: number;
}>;
export declare const ListWithFixedPrice: (params: IListWithFixedPriceParams, options?: IContractOptions) => Promise<IContractError>;
