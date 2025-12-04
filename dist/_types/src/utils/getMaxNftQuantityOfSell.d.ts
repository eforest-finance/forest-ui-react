export declare const SECOND_PER_MINUTES = 60;
declare const getMaxNftQuantityOfSell: (chainId: Chain, nftInfo: INftInfo, address: string) => Promise<false | {
    max: number;
    listedNFTInfoList: any;
    listItems: any;
}>;
export default getMaxNftQuantityOfSell;
