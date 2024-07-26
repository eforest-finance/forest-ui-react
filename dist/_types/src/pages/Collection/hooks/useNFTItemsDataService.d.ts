import { CompositeNftInfosParams } from 'api/types';
export declare const fetchRankingDataOfNft: (aelfInfo: any, nftItemArr: any[], userWalletAddress?: string) => Promise<any[]>;
export declare function useNFTItemsDataService({ pageSize, params, userWalletAddress, }: {
    pageSize?: number;
    params: Partial<CompositeNftInfosParams>;
    userWalletAddress?: string;
}): {
    data: import("ahooks/lib/useInfiniteScroll/types").Data | undefined;
    loading: boolean;
    loadingMore: boolean;
    noMore: boolean;
};
