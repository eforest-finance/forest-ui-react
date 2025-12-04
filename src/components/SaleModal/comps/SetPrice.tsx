import { Tooltip } from 'antd';

import { ISetPriceProps, useSetPriceService } from '../hooks/useSetPrice';
import { InfoCircleOutlined } from '@ant-design/icons';
import { formatTokenPrice } from 'pages/Collection/util.ts';
import { Select, Option } from 'components/BaseSelect/Select/index.tsx';
import Input from 'components/Base/Input/index.tsx';

import styles from './setPrice.moudule.css';

interface IShortCutListProps extends Pick<ISetPriceProps, 'floorPrice' | 'lastSalePrice' | 'bestOfferPrice'> {
  onChangePrice?: (val?: number) => void;
  isMobile?: boolean;
}

const fixedPrice = {
  ELF: {
    symbol: 'ELF',
    tokenId: 'ELF',
    decimals: 8,
    icon: 'ELF',
  },
};

type FixedPriceKey = keyof typeof fixedPrice;

function PriceShortCut({
  title,
  price,
  unit = 'ELF',
  onClick,
}: {
  title: string;
  price: number | string;
  unit?: string;
  onClick: () => void;
}) {
  return (
    <div
      className="bg-fillHoverBg h-[56px] flex items-center justify-center flex-1 mx-2 rounded-lg cursor-pointer"
      onClick={onClick}>
      <span className="text-base font-semibold text-textPrimary">{title}</span>
      <span className="text-base font-normal text-textSecondary ml-4">{formatTokenPrice(price)}</span>
      <span className="text-base font-normal text-textSecondary">{unit}</span>
    </div>
  );
}

function PriceShortCutMobile({
  title,
  price,
  unit = 'ELF',
  onClick,
}: {
  title: string;
  price: number | string;
  unit?: string;
  onClick: () => void;
}) {
  return (
    <div className={styles.shortCut} onClick={onClick}>
      <span className={styles['shortCut_title']}>{title}</span>
      <span className={styles['price']}>{formatTokenPrice(price)}</span>
      <span className={styles['unit']}>{unit}</span>
    </div>
  );
}

const renderTitle = (props: ISetPriceProps) => {
  return (
    <span className="font-medium text-textPrimary text-lg rounded-lg">
      {props.title}
      {props.tooltip ? (
        <Tooltip title={props.tooltip}>
          <InfoCircleOutlined className="text-base ml-1" />
        </Tooltip>
      ) : null}
    </span>
  );
};

const ShortCutList = ({ floorPrice, lastSalePrice, bestOfferPrice, onChangePrice, isMobile }: IShortCutListProps) => {
  const listPrice = [
    {
      title: 'Floor Price',
      price: floorPrice,
    },
    {
      title: 'Last Sale',
      price: lastSalePrice,
    },
    {
      title: 'Best Offer',
      price: bestOfferPrice,
    },
  ];
  const showList = listPrice.filter((item) => Number(item.price || '') > 0);
  if (!showList.length) return null;
  const Comp = !isMobile ? PriceShortCut : PriceShortCutMobile;
  return (
    <div className={`mt-4 flex -mx-2 ${isMobile ? 'flex-col' : ''}`}>
      {showList.map((item) => {
        return (
          <Comp
            key={item.title}
            title={item.title}
            price={formatTokenPrice(item.price || '')}
            onClick={() => {
              onChangePrice && onChangePrice(item.price);
            }}
          />
        );
      })}
    </div>
  );
};

const getShowPrice = (price: string | number) => {
  const priceStr = String(price);
  const indexOfDot = priceStr.indexOf('.');
  if (indexOfDot > -1) {
    const intNumber = formatTokenPrice(priceStr.slice(0, indexOfDot));
    return `${intNumber}${priceStr.slice(indexOfDot)}`;
  }
  return formatTokenPrice(price || '');
};

export function SetPrice(props: ISetPriceProps) {
  const isSmallScreen = true;

  const { price, setToken, setPrice, inputChangeHandler, status } = useSetPriceService(props);

  const { errorTip, placeholder, defaultErrorTip } = props;

  const showPrice = getShowPrice(price || '');

  const selectAfter = (
    <Select
      defaultValue="ELF"
      bordered={false}
      popupClassName="!border-none"
      getPopupContainer={(v) => v}
      className="!border-0 !my-4 !h-6 !-mr-[11px] !border-l border-solid !border-lineDividers !rounded-none"
      onChange={(tokenId) => setToken(fixedPrice?.[tokenId as FixedPriceKey])}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      {Object.values(fixedPrice).map((item) => (
        <Option key={item.tokenId} value={item.tokenId}>
          <span className="flex items-center mr-4">{item.symbol}</span>
        </Option>
      ))}
    </Select>
  );

  const renderError = () => {
    if ((props?.valid || status) !== 'error') return null;
    if (errorTip) {
      return <div className="mt-2 text-xs text-error">{errorTip}</div>;
    }
    return (
      <div className="mt-2 text-xs text-error">
        <span>{defaultErrorTip || 'Please enter a correct price.'}</span>
      </div>
    );
  };

  return (
    <div className={`${isSmallScreen ? 'mt-6' : 'mt-8'} ${props.className}`}>
      {renderTitle(props)}
      <ShortCutList
        lastSalePrice={props.lastSalePrice}
        floorPrice={props.floorPrice}
        bestOfferPrice={props.bestOfferPrice}
        onChangePrice={(val) => {
          setPrice(val);
          setToken(fixedPrice.ELF);
        }}
        isMobile={isSmallScreen}
      />
      <Input
        size="large"
        onKeyDown={(e) => {
          /\d|\.|Backspace|ArrowRight|ArrowLeft|ArrowUp|ArrowDown/.test(e.key) || e.preventDefault();
        }}
        onChange={inputChangeHandler}
        value={showPrice}
        placeholder={placeholder || 'Enter a price'}
        suffix={'ELF'}
        className={`${isSmallScreen ? 'mt-0' : 'mt-4'}`}
        status={props?.valid || status}
      />
      {renderError()}
    </div>
  );
}
