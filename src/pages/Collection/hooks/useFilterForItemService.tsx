import { useSearchParams } from 'next/navigation';
import { getDefaultFilter, getFilter, getFilterFromSearchParams, getFilterList } from '../util';
import { useRequest } from 'ahooks';
import { fetchCollectionAllTraitsInfos, fetchCollectionGenerationInfos } from 'api/fetch.ts';
import { useState } from 'react';
import { isEqual } from 'lodash-es';
import { useForestStore } from 'provider/ForestProvider/index.tsx';
import { IFilterSelect } from '../util';

export function useFilterForItemService(nftCollectionId: string) {
  const nftType = String(nftCollectionId).endsWith('-SEED-0') ? 'seed' : 'nft';

  const [{ chain }, { dispatch }] = useForestStore();

  // const aelfInfo = {};
  const params = useSearchParams();
  const filterParamStr = params.get('filterParams');

  const paramsFromUrlForFilter = getFilterFromSearchParams(filterParamStr);
  const defaultFilter = getDefaultFilter(chain);
  const filterList = getFilterList(nftType, chain);

  const [filterSelect, setFilterSelect] = useState<IFilterSelect>(
    Object.assign({}, defaultFilter, paramsFromUrlForFilter),
  );

  const clearAll = () => {
    if (isEqual(defaultFilter, filterSelect)) return;
    setFilterSelect(defaultFilter);
  };

  const { data: traitsInfo } = useRequest(() => fetchCollectionAllTraitsInfos(nftCollectionId), {
    refreshDeps: [nftCollectionId],
    cacheKey: `all-traits-info-${nftCollectionId}`,
    staleTime: 300000,
  });
  const { data: generationInfos } = useRequest(() => fetchCollectionGenerationInfos(nftCollectionId), {
    refreshDeps: [nftCollectionId],
    cacheKey: `all-generation-info-${nftCollectionId}`,
    staleTime: 300000,
  });

  const { data: rarityInfos } = useRequest(
    () => {
      const isSchrondinger = nftCollectionId.endsWith('-SGRTEST-0') || nftCollectionId.endsWith('-SGR-0');

      const arrList = isSchrondinger
        ? [
            {
              rarity: 'Diamond',
            },
            {
              rarity: 'Emerald',
            },
            {
              rarity: 'Platinum',
            },
            {
              rarity: 'Gold',
            },
            {
              rarity: 'Silver',
            },
            {
              rarity: 'Bronze',
            },
          ]
        : [];

      return Promise.resolve({
        items: arrList,
      });
    },
    {
      refreshDeps: [nftCollectionId],
    },
  );

  const onFilterChange = (val: any) => {
    setFilterSelect((pre) => ({
      ...pre,
      ...val,
    }));
  };

  return {
    traitsInfo,
    generationInfos,
    rarityInfos,
    filterList,
    filterSelect,
    setFilterSelect,
    onFilterChange,
    clearAll,
    formatFilterToParams: getFilter,
  };
}
