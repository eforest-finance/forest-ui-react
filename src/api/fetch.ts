// import { INftInfo, OfferType } from './types';
import request, { cmsRequest, tokenRequest } from './request';
// import qs from 'query-string';
import qs from 'qs';

// const rankApiConfig =
//   process.env.NEXT_PUBLIC_APP_ENV === 'test'
//     ? {
//         baseURL: '/schrodingerai/api',
//       }
//     : {
//         baseURL: '/api',
//       };

const rankApiConfig = {
  baseURL: '/schrodingerai/api',
};

import {
  INftOffersParams,
  ITokens,
  ITokensParams,
  INftTypes,
  ITokenData,
  INftPricesParams,
  IPricesList,
  IListingsParams,
  IActivities,
  IWhitelistPriceTokensResponse,
  INftInfoParams,
  IWhitelistExtraInfosParams,
  IWhitelistExtraInfosResponse,
  IWhitelistManagersParams,
  IWhiteListTagsParams,
  IWhiteListTagsResponse,
  IWhitelistManagersResponse,
  ISyncChainParams,
  ISyncChainResult,
  ISaveNftInfosParams,
  ICommunityItems,
  IListingsResponse,
  IUserSettingParams,
  INftCollectionParams,
  ITokenParams,
  IOwnedSymbolsResponse,
  IOwnedSymbolsParams,
  ISaveCollectionInfosParams,
  IConfigResponse,
  IRecommendCollectionsRes,
  ISpecialSeedParams,
  ISpecialSeedRes,
  IBidInfosResponse,
  IAuctionInfoResponse,
  IMinMarkupPriceResponse,
  CompositeNftInfosParams,
  INftInfoOwnersParams,
  INftInfoOwnersResponse,
  INftSaleInfoParams,
  INftSaleInfoItem,
  IDropDetailResponse,
  IDropQuotaResponse,
  ICollecionTraitsInfoRes,
  ICollecionGenerationInfoRes,
  INftRankingInfo,
  INftRankingInfoParams,
  INftTraitsInfoRes,
  ICollectionActivitiesParams,
  ICollectionActivitiesRes,
  IOwnedAllSymbolsParams,
  IBannerResponse,
  IHotNFTsRes,
  IGenerateParams,
  IGenerateRes,
  ICollectionRarityInfoRes,
  ICreateAIArtResult,
  IFailedAIArtRes,
  IMessageListRes,
  IMyHold,
  IMyHoldSearch,
  IMyHoldSearchRes,
  IActivitySearch,
  IActivitySearchRes,
  IOfferMadeItemRes,
  IOfferMadeParams,
  IReceivedOfferParams,
  IMyHoLdCollectionRes,
  ItemsSource,
  ITransitionFee,
} from './types';

export const fetchCollectionAllTraitsInfos = async (nftCollectionId: string) => {
  return request.post<
    {
      id: string;
      skipCount: number;
      maxResultCount: number;
    },
    ICollecionTraitsInfoRes
  >('app/trait/nft-collection-traits-info', {
    id: nftCollectionId,
    skipCount: 0,
    maxResultCount: 128,
  });
};

export const fetchCollectionGenerationInfos = async (nftCollectionId: string) => {
  return request.get<ICollecionGenerationInfoRes>('app/trait/nft-collection-generation-info', {
    params: { id: nftCollectionId },
  });
};

export const fetchNftRankingInfoApi = async (params: INftRankingInfoParams) => {
  return request.post<INftRankingInfoParams, INftRankingInfo[]>('probability/catsRank', params, rankApiConfig);
};

export const fetchCompositeNftInfos = async (params: Partial<CompositeNftInfosParams>) => {
  return request.post<Partial<CompositeNftInfosParams>, ItemsSource>('app/nft/composite-nft-infos', params);
};

export const fetchGetTokenData = async (params: { symbol: string }): Promise<ITokenData> => {
  return request.get<ITokenData>('app/tokens/market-data', { params });
};

export const fetchTransactionFee = async () => {
  return request.get<ITransitionFee>('app/seed/transaction-fee');
};

export const fetchNftSalesInfo = async (params: INftSaleInfoParams) => {
  return request.get<INftSaleInfoItem>('app/nft/nft-for-sale', { params });
};

export const fetchListings = async (params: IListingsParams): Promise<IListingsResponse> => {
  return request.get<IListingsResponse>('app/market/nft-listings', { params });
};
