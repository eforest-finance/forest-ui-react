// import { InputProps } from 'baseComponents/Input/index.tsx';
import Input from 'components/Base/Input/index.tsx';
import FormItem from 'components/Base/FormItem/index.tsx';
import { formatTokenPrice } from 'pages/Collection/util.ts';

import styles from './index.module.css';

export default function InputQuantity(props: any & { availableMount: number | string; errorTip?: string }) {
  const { availableMount, errorTip } = props;

  return (
    <FormItem title="Quantity" error={{ msg: errorTip || '' }}>
      <>
        <div className="mt-[16px] relative">
          <Input
            onKeyDown={(e) => {
              /\d|\.|Backspace|ArrowRight|ArrowLeft|ArrowUp|ArrowDown/.test(e.key) || e.preventDefault();
            }}
            placeholder="Please enter the quantity"
            size="large"
            {...props}
            status={errorTip && 'error'}
          />
          <span className={styles.available}>{formatTokenPrice(availableMount)} available</span>
        </div>
      </>
    </FormItem>
  );
}
