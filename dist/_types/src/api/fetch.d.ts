import { ITokenData, IListingsParams, IListingsResponse, CompositeNftInfosParams, INftSaleInfoParams, INftSaleInfoItem, ICollecionTraitsInfoRes, ICollecionGenerationInfoRes, INftRankingInfo, INftRankingInfoParams, ItemsSource, ITransitionFee } from './types';
export declare const fetchCollectionAllTraitsInfos: (nftCollectionId: string) => Promise<ICollecionTraitsInfoRes>;
export declare const fetchCollectionGenerationInfos: (nftCollectionId: string) => Promise<ICollecionGenerationInfoRes>;
export declare const fetchNftRankingInfoApi: (params: INftRankingInfoParams) => Promise<INftRankingInfo[]>;
export declare const fetchCompositeNftInfos: (params: Partial<CompositeNftInfosParams>) => Promise<ItemsSource>;
export declare const fetchGetTokenData: (params: {
    symbol: string;
}) => Promise<ITokenData>;
export declare const fetchTransactionFee: () => Promise<ITransitionFee>;
export declare const fetchNftSalesInfo: (params: INftSaleInfoParams) => Promise<INftSaleInfoItem>;
export declare const fetchListings: (params: IListingsParams) => Promise<IListingsResponse>;
