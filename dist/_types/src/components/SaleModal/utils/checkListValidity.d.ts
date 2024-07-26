import { BatchDeListType, IListDuration, IListedNFTInfo } from 'contract/type.ts';
export declare enum EditStatusType {
    timeGreater = 0,
    priceGreater = 1
}
export declare const inValidListErrorMessage: {
    portkey: {
        [x: number]: string[];
    };
    default: {
        [x: number]: string[];
    };
};
export declare const editSuccessTipMessage: {
    1: string;
    0: string;
};
declare const checkListValidity: (price: string, listedNFTInfoList: IListedNFTInfo[], duration: IListDuration) => {
    status: BatchDeListType;
    extendStatus: EditStatusType;
    invalidList: IListedNFTInfo[];
};
export default checkListValidity;
