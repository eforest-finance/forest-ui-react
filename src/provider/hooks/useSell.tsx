import { Store, useForestStore } from '../../..';
import { useModal } from '@ebay/nice-modal-react';
import { getDefaultDataByNftInfoList, useGetListItemsForSale } from 'components/SaleModal/hooks/useSaleService.ts';
import { SaleModalERC1155 } from 'components/SaleModal/index.tsx';
import { useCallback, useEffect, useState } from 'react';

export interface UseSellProps {
  nftInfo: any;
  onViewNft?: () => void;
}

export function useSell(props: UseSellProps) {
  const { nftInfo, onViewNft } = props;
  const saleModal = useModal(SaleModalERC1155);
  const [defaultData, setDefaultData] = useState<any>();
  const { listedNFTInfoList } = useGetListItemsForSale(nftInfo as INftInfo);
  const env = Store.getInstance().getValue('env');

  useEffect(() => {
    const data = getDefaultDataByNftInfoList(listedNFTInfoList, true);
    setDefaultData(data);
  }, []);

  const handleSell = useCallback(() => {
    saleModal.show({
      nftInfo,
      type: 'add',
      defaultData,
      onViewNft,
    });
  }, [saleModal, nftInfo, defaultData]);

  return {
    sell: handleSell,
  };
}
