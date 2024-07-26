import { useEffect } from 'react';
import { useForestStore } from '../../..';
import { useModal } from '@ebay/nice-modal-react';
import BuyNowModal from 'components/BuyModal/index.tsx';
import { useGetELFToDollarRate } from 'pages/Collection/hooks/useGetELFRateService.tsx';

export interface UseBuyProps {
  nftInfo: any;
}

export function useBuy(props: UseBuyProps) {
  const { nftInfo } = props;
  const buyNowModal = useModal(BuyNowModal);
  const { ELFToDollarRate } = useGetELFToDollarRate();

  const handleBuyNow = () => {
    buyNowModal.show({
      elfRate: ELFToDollarRate,
      nftInfo,
    });
  };

  return {
    buyNow: handleBuyNow,
  };
}
