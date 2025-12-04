import { fetchNftSalesInfo } from 'api/fetch.ts';
import { INftSaleInfoItem } from 'api/types';
import { useEffect, useState } from 'react';
import { Store } from '../../..';

export function useGetSalesInfo(id: string) {
  const [salesInfo, setSalesInfo] = useState<INftSaleInfoItem>();
  const walletInfo = Store.getInstance().getValue('walletInfo');

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        return;
      }
      const salesInfo = fetchNftSalesInfo({ id, excludedAddress: walletInfo?.address || '' });

      try {
        const info = await salesInfo;
        console.log('salesInfo', info);

        setSalesInfo(info);
      } catch (e) {
        console.log('error', e);
      }
    }
    fetchData();
  }, [id, walletInfo]);

  return salesInfo;
}
