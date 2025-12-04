import { formatTokenPrice } from 'pages/Collection/util.ts';
import styles from './index.module.css';

export default function Balance(props: { amount: number | string; itemDesc?: string; suffix?: string }) {
  const { itemDesc, amount, suffix } = props;
  return (
    <div className={styles.balance}>
      <span>{itemDesc || 'Balance'}</span>
      <span>{`${formatTokenPrice(amount)}${suffix ? ` ${suffix}` : ''}`}</span>
    </div>
  );
}
