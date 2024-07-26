import Input from 'components/Base/Input/index.tsx';
import { useSellItemNumber, ISetSellItemNumberProps } from '../hooks/useSellItemNumber';
import { formatTokenPrice } from 'pages/Collection/util.ts';
import { thousandsNumber } from 'utils/unit.ts';

import styles from './SetSellItemNumber.moudule.css';

export function SetSellItemNumber(props: ISetSellItemNumberProps) {
  const isSmallScreen = true;
  const { maxNumber, inputChangeHandler, value, status } = useSellItemNumber(props);
  const renderError = () => {
    return (
      <div className={styles.err}>
        <span className={styles.textErr}>{status !== 'error' ? '' : 'Please enter a correct quantity.'}</span>
      </div>
    );
  };
  return (
    <div className={`${isSmallScreen ? 'mt-6' : 'mt-8'}`}>
      <span className={styles.quantity}>Quantity of Items</span>
      <div className="mt-4 relative">
        <Input
          size="large"
          allowClear={true}
          value={formatTokenPrice(value || '')}
          status={status}
          onKeyDown={(e) => {
            /\d|\.|Backspace|ArrowRight|ArrowLeft|ArrowUp|ArrowDown/.test(e.key) || e.preventDefault();
          }}
          onChange={inputChangeHandler}
          placeholder="Enter the quantity of items to list"
        />
        <span className={styles.available}>{thousandsNumber(maxNumber)} available</span>
      </div>
      {renderError()}
    </div>
  );
}
