import { IBatchBuyNowParams, IPrice } from 'contract/type.ts';
export declare const UserDeniedMessage = "Request rejected. Forest needs your permission to continue";
declare function useBatchBuy(nftInfo: any, chainId?: Chain): (parameter: IBatchBuyNowParams & {
    price: IPrice;
    quantity: number;
    nftDecimals: number;
}) => Promise<any>;
export default useBatchBuy;
