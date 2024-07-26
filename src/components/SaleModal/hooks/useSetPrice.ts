import { ReactNode, useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useUpdateEffect } from 'react-use';
import { InputStatus } from 'antd/lib/_util/statusUtils';

export const AMOUNT_LENGTH = 11;

export interface ITokenOfPrice {
  symbol: string;
  tokenId: string;
  decimals: number;
  icon?: string;
}

export interface IPrice {
  token?: ITokenOfPrice;
  price?: number | string;
}
export interface ISetPriceProps {
  onChange?: (price: IPrice) => void;
  editMode?: boolean;
  title?: string;
  tooltip?: string;
  floorPrice?: number;
  lastSalePrice?: number;
  bestOfferPrice?: number;
  defaultPrice?: number | string;
  className?: string;
  errorTip?: string | ReactNode;
  checkValid?: (price: number) => boolean;
  placeholder?: string;
  valid?: InputStatus;
  defaultErrorTip?: string;
}

export function useSetPriceService({ onChange, defaultPrice, checkValid }: ISetPriceProps) {
  const [price, setPrice] = useState<number | string | undefined>(defaultPrice);
  const [token, setToken] = useState<ITokenOfPrice>({
    symbol: 'ELF',
    tokenId: 'ELF',
    decimals: 8,
  });

  const [status, setStatus] = useState<'' | 'error'>();

  const inputChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>): string | void => {
    const { target } = event;
    let deFormateValue = String(target.value || '').replaceAll(',', '');
    const indexOfDot = deFormateValue.indexOf('.');
    const lastIndexOfDot = deFormateValue.lastIndexOf('.');
    if (indexOfDot > -1 && indexOfDot !== lastIndexOfDot) {
      deFormateValue = deFormateValue.slice(0, -1);
    }
    const pivot = new BigNumber(deFormateValue);
    if ((pivot.e || 0) > AMOUNT_LENGTH - 1) return deFormateValue.slice(0, AMOUNT_LENGTH);
    const [, dec] = deFormateValue.split('.');
    const decimals = 4;
    if (pivot.gte(0)) {
      setPrice((dec?.length || 0) >= +decimals ? pivot.toFixed(+decimals, BigNumber.ROUND_DOWN) : deFormateValue);
    } else {
      setPrice('');
    }
  }, []);

  useEffect(() => {
    onChange &&
      onChange({
        token,
        price,
      });
  }, [price, onChange, token]);

  useUpdateEffect(() => {
    const status =
      isNaN(Number(price)) || Number(price) <= 0 || (checkValid && !checkValid?.(Number(price))) ? 'error' : '';
    setStatus(status);
  }, [price]);

  return {
    inputChangeHandler,
    price,
    setPrice,
    token,
    setToken,
    status,
  };
}
