import { useInfiniteScroll } from 'ahooks';
import { fetchCompositeNftInfos, fetchNftRankingInfoApi } from 'api/fetch.ts';
import { CompositeNftInfosParams, INftRankingInfo } from 'api/types';
import { ITraitInfo } from 'types/index';
import { addPrefixSuffix, getParamsByTraitPairsDictionary, thousandsNumber } from 'utils/unit.ts';
import { useForestStore } from 'provider/ForestProvider/index.tsx';

export const fetchRankingDataOfNft = async (aelfInfo: any, nftItemArr: any[], userWalletAddress?: string) => {
  if (!userWalletAddress) return nftItemArr;
  const needShowRankingNftArr = nftItemArr.filter(
    (itm) => itm.generation === 9 && itm.traitPairsDictionary?.length >= 11,
  );
  if (!needShowRankingNftArr.length) return nftItemArr;
  const batchTraitsParams = needShowRankingNftArr.map((nftInfo) => {
    const traitInfos = nftInfo.traitPairsDictionary;

    const params = getParamsByTraitPairsDictionary(traitInfos as ITraitInfo[]);

    return params;
  });

  let resData: INftRankingInfo[] = [];
  try {
    resData = await fetchNftRankingInfoApi({
      address: addPrefixSuffix(aelfInfo, userWalletAddress),
      catsTraits: batchTraitsParams as string[][][][],
    });
  } catch (error) {
    console.error(error);
  }

  if (!resData?.length) {
    return nftItemArr;
  }
  needShowRankingNftArr.forEach((item, index) => {
    const data = resData?.[index]?.rank;
    if (data.rank) {
      let str = `${thousandsNumber(data.rank)}`;
      if (data.total) {
        str += ` / ${thousandsNumber(data.total)}`;
      }
      item._rankStrForShow = str;
    }
  });

  return nftItemArr;
};

const fetchNFTItemsData = async (
  aelfInfo: any,
  params: Partial<CompositeNftInfosParams>,
  userWalletAddress?: string,
) => {
  const res = await fetchCompositeNftInfos(params);
  try {
    const items = await fetchRankingDataOfNft(aelfInfo, res.items, userWalletAddress);
    res.items = items;
  } catch (error) {
    console.error(error);
  }

  return res;
};

export function useNFTItemsDataService({
  pageSize = 32,
  params,
  userWalletAddress,
}: {
  pageSize?: number;
  params: Partial<CompositeNftInfosParams>;
  userWalletAddress?: string;
}) {
  const [{ wallet, aelfInfo }, { dispatch }] = useForestStore();

  const { data, loading, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      const _page = !d?._page ? 1 : d._page + 1;

      return fetchNFTItemsData(
        aelfInfo,
        {
          ...params,
          SkipCount: (_page - 1) * pageSize,
          MaxResultCount: pageSize,
        },
        userWalletAddress,
      )
        .then((res) => {
          return {
            list: res.items,
            totalCount: res.totalCount,
            _page,
          };
        })
        .catch(() => {
          return {
            list: [],
            totalCount: d?.totalCount || 0,
            _page,
          };
        });
    },
    {
      target: document.getElementById('nft-list'),
      isNoMore: (data) => {
        if (!data?.list.length) return true;
        return data._page * pageSize > data.list.length || data?.list?.length >= data?.totalCount;
      },
      reloadDeps: [userWalletAddress, params],
    },
  );

  return {
    data,
    loading,
    loadingMore,
    noMore,
  };
}
