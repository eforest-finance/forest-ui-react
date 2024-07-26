import BigNumber from 'bignumber.js';
import { formatTokenPrice } from 'pages/Collection/util.ts';
import styles from './SummaryInfo.module.css';
interface IInfoItemProps {
  left: string;
  right: string;
  className?: string;
}

interface IPreviewInfo {
  listingPrice?: number | string;
  forestFees?: number;
  itemsForSell?: number | string;
}

const InfoItem = ({ left, right, className = '' }: IInfoItemProps) => {
  return (
    <div className={styles.infoItem}>
      <span className={`${styles['infoItem_normal']} ${className}`}>{left}</span>
      <span className={`${styles['infoItem_normal']} ${className}`}>{right}</span>
    </div>
  );
};

const getShowInfoData = ({ listingPrice = '', itemsForSell = 1, forestFees = 0.025 }: IPreviewInfo) => {
  const num = new BigNumber(itemsForSell);
  const price = new BigNumber(listingPrice);
  const showPrice = price.isNaN() ? '--' : formatTokenPrice(price.times(num));
  const totalPrice =
    num.isNaN() || price.isNaN()
      ? '--'
      : price
          .times(num)
          .times(1 - forestFees)
          .toNumber();
  const showForestFees = new BigNumber(forestFees).times(100).toNumber();

  return {
    showPrice: `${formatTokenPrice(showPrice)} ELF`,
    showForestFees: `${showForestFees}%`,
    totalPrice: `${formatTokenPrice(totalPrice)} ELF`,
  };
};

export function SummaryInfo(props: IPreviewInfo) {
  const isSmallScreen = true;

  const { showPrice, showForestFees, totalPrice } = getShowInfoData(props);

  return (
    <div className={`-mb-2 flex flex-col ${isSmallScreen ? 'mt-6' : 'mt-8'}`}>
      <span className={styles.preview}>Preview</span>
      <InfoItem left="Listing Price" right={showPrice} />
      <InfoItem left="Forest Fees" right={showForestFees} />
      <InfoItem className="!text-textPrimary" left="Total Potential Earnings" right={totalPrice} />
    </div>
  );
}
