import { ImageEnhance } from 'components/ImageEnhance/index.tsx';
import { formatTokenPrice, formatUSDPrice, handlePlurality } from 'pages/Collection/util.ts';
import { useMemo } from 'react';
// import useDetailGetState from 'store/state/detailGetState';
// import { handlePlurality } from 'utils/handlePlurality';
import styles from './index.module.css';

export enum PriceTypeEnum {
  BUY = 1,
  BUY721 = 2,
  MAKEOFFER = 3,
  MAKEOFFER721 = 4,
  DEAL = 5,
}

const typeDescMaps: Record<PriceTypeEnum, string> = {
  [PriceTypeEnum.BUY]: 'Average Item Price',
  [PriceTypeEnum.BUY721]: 'Listing Price',
  [PriceTypeEnum.MAKEOFFER]: 'Total Offer Amount',
  [PriceTypeEnum.MAKEOFFER721]: 'Offer Amount',
  [PriceTypeEnum.DEAL]: 'Offer Amount',
};

export default function PriceInfo(props: {
  nftInfo?: INftInfo;
  quantity: number | string;
  price: string | number;
  convertPrice: string | number;
  type: PriceTypeEnum;
}) {
  const { quantity, price, convertPrice, type, nftInfo } = props;

  const priceDesc = useMemo(() => {
    return typeDescMaps[type];
  }, [type]);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col mdTW:flex-row">
        <ImageEnhance className={styles.image} src={nftInfo?.previewImage || ''} />
        <div>
          <p className={styles['collection-tokenName']}>{nftInfo?.nftCollection?.tokenName}</p>
          <p className={styles.tokenName}>{nftInfo?.tokenName}</p>
          <p className="text-[16px] leading-[24px] font-medium text-[var(--text-secondary)] mt-[4px] hidden mdTW:block">
            {handlePlurality(Number(quantity), 'item')}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <div className={styles.priceDesc}>{priceDesc}</div>
          <div className={styles.price}>{formatTokenPrice(price)} ELF</div>
          <div className={styles.usdPrice}>{formatUSDPrice(convertPrice)}</div>
        </div>
        <div className={styles.quantity}>{handlePlurality(Number(quantity), 'item')}</div>
      </div>
    </div>
  );
}
