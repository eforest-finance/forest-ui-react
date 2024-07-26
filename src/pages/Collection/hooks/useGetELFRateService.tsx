import { useRequest } from 'ahooks';
import { fetchGetTokenData } from 'api/fetch.ts';

export function useGetELFToDollarRate() {
  const { data } = useRequest(() => fetchGetTokenData({ symbol: 'ELF' }), {
    cacheKey: 'elf-to-dollar-rate',
    staleTime: 300000,
  });

  return {
    ELFToDollarRate: data?.price || 0,
  };
}
