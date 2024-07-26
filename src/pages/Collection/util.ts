import { FilterKeyEnum, FilterType, RangeType, SourceItemType } from 'constants/collection.ts';
import BigNumber from 'bignumber.js';

export enum CollectionsStatus {
  'Buy Now' = 1,
  'My Items' = 2,
  'On Auction' = 3,
  'Has Offers' = 4,
}

enum SymbolTypeEnum {
  FT,
  NFT,
}

export type CheckboxItemType = {
  key: FilterKeyEnum;
  title: string;
  maxCount?: number;
  decimals?: number;
  AMOUNT_LENGTH?: number;
  type: FilterType.Checkbox;
  showClearAll?: boolean;
  data: SourceItemType[];
};

export type RangeItemType = {
  key: FilterKeyEnum;
  title: string;
  maxCount?: number;
  AMOUNT_LENGTH?: number;
  decimals?: number;
  type: FilterType.Range;
  showClearAll?: boolean;
  data?: SourceItemType[];
};

export type SearchCheckBoxItemType = {
  key: FilterKeyEnum;
  title: string;
  type: FilterType.SearchCheckbox;
  showClearAll?: boolean;
  data?: SourceItemType[];
  maxCount?: number;
  AMOUNT_LENGTH?: number;
  decimals?: number;
};

export type TagItemType = {
  label: string;
  type: string;
  value?: string | number;
  disabled?: boolean;
};
export interface IFilterSelect {
  [FilterKeyEnum.Status]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Chain]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Symbol]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Price]: {
    type: FilterType.Range;
    data: RangeType[];
  };
  [FilterKeyEnum.Generation]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Traits]?: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.ActivityType]?: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [key: string]: any;
}

const bigStr = (str: string) => {
  return str === '' ? undefined : new BigNumber(str).toNumber();
};

export const getFilter = (filterSelect: IFilterSelect, isActivity?: boolean) => {
  const status = filterSelect.Status.data.map((item: SourceItemType) => item.value);
  const generation = filterSelect.Generation.data.map((item: SourceItemType) => item.value);
  const RarityList = filterSelect.Rarity?.data?.map?.((item: SourceItemType) => item.value);
  const traits = getTraitsInfo();
  const params: { [key: string]: any } = {
    ChainList: filterSelect.Chain.data.map((item: SourceItemType) => item.value as 'AELF' | 'tDVV'),
    SymbolTypeList: filterSelect.Symbol.data.map((item: SourceItemType) => item.value as number),
    PriceLow: bigStr(filterSelect.Price.data[0].min),
    PriceHigh: bigStr(filterSelect.Price.data[0].max),
    HasListingFlag: status.includes(CollectionsStatus['Buy Now']),
    HasAuctionFlag: status.includes(CollectionsStatus['On Auction']),
    HasOfferFlag: status.includes(CollectionsStatus['Has Offers']),
  };
  if (generation?.length) {
    Object.assign(params, {
      generation,
    });
  }
  if (traits?.length) {
    Object.assign(params, {
      traits,
    });
  }

  if (RarityList?.length) {
    Object.assign(params, {
      RarityList,
    });
  }

  if (isActivity) {
    ['PriceLow', 'PriceHigh', 'HasListingFlag', 'HasAuctionFlag', 'HasOfferFlag'].forEach((key) => delete params[key]);
  }

  return params;

  function getTraitsInfo() {
    const targetKeys = Object.keys(filterSelect).filter((key) => key.includes(FilterKeyEnum.Traits));
    if (!targetKeys.length) return null;
    const res: Array<{
      key: string;
      values: (string | number)[];
    }> = [];

    targetKeys.forEach((key) => {
      const [, subKey] = key.split('-');
      if (!subKey || !filterSelect?.[key]?.data?.length) return;
      res.push({
        key: subKey,
        values: filterSelect[key].data.map((item: SourceItemType) => item.value),
      });
    });

    return res;
  }
};

export function formatTokenPrice(
  price: number | BigNumber | string,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 4, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const priceBig: BigNumber = BigNumber.isBigNumber(price) ? price : new BigNumber(price);
  if (priceBig.isNaN()) return `${price}`;

  if (!priceBig.isEqualTo(0) && priceBig.lt(0.0001)) {
    return '< 0.0001';
  }

  const priceFixed = priceBig.toFixed(decimalPlaces, roundingMode);
  const res = new BigNumber(priceFixed).toFormat();
  return res;
}

export const getTagList = (filterSelect: IFilterSelect, search: string) => {
  const result: TagItemType[] = [];
  for (const [key, value] of Object.entries(filterSelect)) {
    const { data, type } = value;
    if (type === FilterType.Checkbox) {
      data.forEach((element: SourceItemType) => {
        if (!element.disabled) {
          if (typeof element === 'object') {
            result.push({
              type: key,
              ...element,
            });
          } else {
            result.push({
              type: key,
              value: element,
              label: element,
            });
          }
        }
      });
    } else if (type === FilterType.Range) {
      const { min, max } = data[0];
      if (min || max) {
        const label =
          min && max
            ? `${formatTokenPrice(min)}-${formatTokenPrice(max)}`
            : (min === 0 || min) && !max
            ? `≥${formatTokenPrice(min)}`
            : `≤${formatTokenPrice(max)}`;
        result.push({
          type: key,
          label:
            `${key === FilterKeyEnum.Price ? '' : 'Length: '}` + label + `${key === FilterKeyEnum.Price ? ' ELF' : ''}`,
        });
      }
    } else if (type === FilterType.SearchCheckbox) {
      data.forEach((element: SourceItemType) => {
        if (!element.disabled) {
          result.push({
            type: key,
            ...element,
          });
        }
      });
    }
  }
  if (search) {
    result.push({
      type: 'search',
      label: search,
    });
  }

  return result;
};

export const getDefaultFilter = (ChainId: string): IFilterSelect => {
  const res: IFilterSelect = {
    [FilterKeyEnum.Status]: {
      type: FilterType.Checkbox,
      data: [],
    },
    [FilterKeyEnum.Chain]: {
      type: FilterType.Checkbox,
      data: [{ value: ChainId, label: `SideChain ${ChainId}`, disabled: true }],
    },
    [FilterKeyEnum.Price]: {
      type: FilterType.Range,
      data: [
        {
          min: '',
          max: '',
        },
      ],
    },
    [FilterKeyEnum.Symbol]: {
      type: FilterType.Checkbox,
      data: [],
    },
    [FilterKeyEnum.Generation]: {
      type: FilterType.Checkbox,
      data: [],
    },
    [FilterKeyEnum.Traits]: {
      type: FilterType.Checkbox,
      data: [],
    },
  };

  return res;
};

export function getFilterFromSearchParams(filterParamStr: string | null) {
  if (!filterParamStr) return {};

  const filterParamsObj = JSON.parse(decodeURI(filterParamStr)) as {
    [FilterKeyEnum.Traits]?: {
      key: string;
      values: string[];
    }[];
  };

  const res: {
    [key: string]: {
      type: FilterType;
      data: Array<{
        label: string;
        value: string;
      }>;
    };
  } = {};

  filterParamsObj?.[FilterKeyEnum.Traits]?.forEach?.((item) => {
    const tmpObj = {
      type: FilterType.Checkbox,
      data: (item.values || []).map((itm) => ({
        label: itm,
        value: itm,
      })),
    };
    res[`${FilterKeyEnum.Traits}-${item.key}`] = tmpObj;
  });

  return res;
}

export const getFilterList = (
  type: string,
  ChainId: string,
): Array<CheckboxItemType | RangeItemType | SearchCheckBoxItemType> => {
  const filterList = [
    {
      key: FilterKeyEnum.Status,
      title: FilterKeyEnum.Status,
      type: FilterType.Checkbox,
      data: [
        {
          value: CollectionsStatus['Buy Now'],
          label: CollectionsStatus[1],
        },
        {
          value: CollectionsStatus['On Auction'],
          label: CollectionsStatus[3],
        },
        {
          value: CollectionsStatus['Has Offers'],
          label: CollectionsStatus[4],
        },
      ],
    },
    {
      key: FilterKeyEnum.Chain,
      title: FilterKeyEnum.Chain,
      type: FilterType.Checkbox,
      data: [{ value: ChainId, label: `SideChain ${ChainId}`, disabled: true }],
    },
    {
      key: FilterKeyEnum.Price,
      title: FilterKeyEnum.Price,
      type: FilterType.Range,
      data: [],
    },
    {
      key: FilterKeyEnum.Symbol,
      title: FilterKeyEnum.Symbol,
      showClearAll: true,
      type: FilterType.Checkbox,
      data: [
        { value: SymbolTypeEnum.FT, label: 'FT' },
        { value: SymbolTypeEnum.NFT, label: 'NFT' },
      ],
    },
    {
      key: FilterKeyEnum.Traits,
      title: FilterKeyEnum.Traits,
      showClearAll: true,
      type: FilterType.SearchCheckbox,
      data: [],
    },
    {
      key: FilterKeyEnum.Generation,
      title: FilterKeyEnum.Generation,
      showClearAll: true,
      type: FilterType.Checkbox,
      data: [],
    },
    {
      key: FilterKeyEnum.Rarity,
      title: FilterKeyEnum.Rarity,
      showClearAll: true,
      type: FilterType.Checkbox,
      data: [],
    },
  ] as any;
  if (type === 'nft') {
    filterList.splice(3, 1);
    filterList[0].data.splice(1, 1);
  }
  return filterList;
};

export function formatUSDPrice(
  price: number | BigNumber | string,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 4, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const priceBig: BigNumber = BigNumber.isBigNumber(price) ? price : new BigNumber(price);
  if (priceBig.isNaN()) return `${price}`;
  const priceFixed = priceBig.toFixed(decimalPlaces, roundingMode);
  const priceFixedBig = new BigNumber(priceFixed);

  if (priceBig.comparedTo(0) === 0) {
    return '$ 0';
  }

  if (priceFixedBig.comparedTo(0.0001) === -1) {
    return '<$ 0.0001';
  }

  return `$ ${priceFixedBig.toFormat()}`;
}

export const handlePlurality = (num: number, noun: string) => {
  if (typeof num !== 'number') return num;
  switch (noun) {
    case 'day':
      if (num > 1) {
        return `${formatTokenPrice(num)} days`;
      }
      return `${formatTokenPrice(num)} day`;
    default:
      if (num > 1) {
        if (noun.endsWith('s') || noun.endsWith('x') || noun.endsWith('ch') || noun.endsWith('sh')) {
          return `${formatTokenPrice(num)} ${noun}es`;
        } else if (noun.endsWith('y')) {
          return `${formatTokenPrice(num)} ${noun.slice(0, -1)}ies`;
        } else {
          return `${formatTokenPrice(num)} ${noun}s`;
        }
      } else {
        return `${formatTokenPrice(num)} ${noun}`;
      }
  }
};
