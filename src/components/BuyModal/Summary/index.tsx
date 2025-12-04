import { formatTokenPrice, formatUSDPrice } from 'pages/Collection/util.ts';
import useGetTransitionFee from 'provider/hooks/useGetTransitionFee.tsx';
import styles from './index.module.css';

export default function Summary() {
  const { transactionFee } = useGetTransitionFee();

  return (
    <>
      <h3 className={styles.title}>Preview</h3>
      <div className="flex justify-between mt-[16px]">
        <span className={styles.estimated}>Estimated Transaction Fee</span>
        <div className="flex flex-col items-end">
          <span className={styles.price}>{formatTokenPrice(transactionFee?.transactionFee || 0)} ELF</span>
          <span className={styles.usdPrice}>{formatUSDPrice(transactionFee?.transactionFeeOfUsd || 0)}</span>
        </div>
      </div>
    </>
  );
}
