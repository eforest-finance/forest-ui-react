import { ITraitInfo } from 'types/index.ts';
import BigNumber from 'bignumber.js';
import { handlePlurality } from 'pages/Collection/util.ts';
import { Store } from '../..';
import { SupportedELFChainId } from 'constants/collection.ts';

enum ENVIRONMENT {
  TEST = 'test',
  DEVELOPMENT = 'development',
  DEVELOPMENT4 = 'development4',
  PRODUCTION = 'production',
}

const explorerUrls = {
  [ENVIRONMENT.TEST]: {
    AELF: 'https://explorer-test.aelf.io/',
    TDVV: 'https://explorer-test-side02.aelf.io/',
    TDVW: 'https://explorer-test-side02.aelf.io/',
  },
  [ENVIRONMENT.PRODUCTION]: {
    AELF: 'https://explorer.aelf.io/',
    TDVV: 'https://tdvv-explorer.aelf.io/',
    TDVW: 'https://tdvv-explorer.aelf.io/',
  },
};

export const EXPLORE_URL = (chainId: string) => {
  const env = Store.getInstance().getValue('env');
  console.log('env:', env);

  return {
    AELF: explorerUrls[env].AELF,
    TDVV: explorerUrls[env].TDVV,
    TDVW: explorerUrls[env].TDVW,
  }[chainId];
};

export const thousandsNumber = (number?: string | number): string => {
  const num = Number(number);
  if (number === '' || Number.isNaN(num)) return '-';
  return `${num.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
};

export const addPrefixSuffix = (info: any, str: string, ChainId?: string) => {
  if (!str) return str;
  let resStr = str;
  const prefix = 'ELF_';
  const suffix = `_${ChainId || info?.curChain}`;
  if (!str.startsWith(prefix)) {
    resStr = `${prefix}${resStr}`;
  }
  if (!str.endsWith(suffix)) {
    resStr = `${resStr}${suffix}`;
  }
  return resStr;
};

export function getParamsByTraitPairsDictionary(traitInfos: Array<Pick<ITraitInfo, 'key' | 'value'>>) {
  const map: {
    [key: string]: string;
  } = {
    'Weapon(Left Hand)': 'Weapon',
    'Accessory(Right Hand)': 'Accessory',
    Wing: 'Wings',
    Moustauch: 'Mustache',
    Mustaches: 'Mustache',
  };
  const oneGeneration = [
    traitInfos.slice(0, 3).map((trait) => map[trait.key.trim()] || trait.key.replace(/\(.*\)/, '').trim()),
    traitInfos.slice(0, 3).map((trait) => trait.value.trim()),
  ];
  const twoToGeneration =
    traitInfos.length > 3
      ? [
          traitInfos.slice(3).map((trait) => map[trait.key.trim()] || trait.key.replace(/\(.*\)/, '').trim()),
          traitInfos.slice(3).map((trait) => trait.value.trim()),
        ]
      : [];
  const params = [oneGeneration, twoToGeneration];
  return params;
}

export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export function ipfsURLToS3AndIpfsURL(url: string, s3ImagePrefixUri: string, ipfsToSchrodingerURL: string): string[] {
  let URLObj = null;
  try {
    URLObj = new URL(url);
  } catch (error) {
    return [url];
  }

  const host = URLObj.host.toLowerCase();
  if (host === 'ipfs.io') {
    const hash = URLObj.pathname.replace('/ipfs/', '');
    return [`${s3ImagePrefixUri}/${hash}`, `${ipfsToSchrodingerURL}/${hash}`, url];
  }
  if (URLObj.protocol.toLowerCase() === 'ipfs:') {
    const hash = url.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
    return [`${s3ImagePrefixUri}/${hash}`, `https://ipfs.io/ipfs/${hash}`];
  }
  return [url];
}

const formatInputNumber = (value: string, max: number) => {
  let deFormateValue = String(value || '').replaceAll(',', '');
  const indexOfDot = deFormateValue.indexOf('.');
  const lastIndexOfDot = deFormateValue.lastIndexOf('.');
  if (indexOfDot > -1 && indexOfDot !== lastIndexOfDot) {
    deFormateValue = deFormateValue.slice(0, -1);
  }
  const pivot = new BigNumber(deFormateValue);
  if ((pivot.e || 0) > max - 1) return deFormateValue.slice(0, max);
  const [, dec] = deFormateValue.split('.');
  const decimals = 4;
  if (pivot.gt(0)) {
    return (dec?.length || 0) >= +decimals ? pivot.toFixed(+decimals, BigNumber.ROUND_DOWN) : deFormateValue;
  } else {
    return '';
  }
};

export const ZERO = new BigNumber(0);

export function divDecimals(a?: BigNumber.Value, decimals: string | number = 18) {
  if (!a) return ZERO;
  const bigA = BigNumber.isBigNumber(a) ? a : new BigNumber(a || '');
  if (bigA.isNaN()) return ZERO;
  if (typeof decimals === 'string' && decimals.length > 10) {
    return bigA.div(decimals);
  }
  return bigA.div(`1e${decimals}`);
}

export function timesDecimals(a?: BigNumber.Value, decimals: string | number = 18) {
  if (!a) return ZERO;
  const bigA = BigNumber.isBigNumber(a) ? a : new BigNumber(a || '');
  if (bigA.isNaN()) return ZERO;
  if (typeof decimals === 'string' && decimals.length > 10) {
    return bigA.times(decimals);
  }
  return bigA.times(`1e${decimals || 18}`);
}

export { formatInputNumber };

const getExpiryTime = (timestamp: number) => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = timestamp - now;

  if (diffValue < 0) {
    return 'in 1 minute';
  }
  const monthCount = diffValue / month;
  const dayCount = diffValue / day;
  const hourCount = diffValue / hour;
  const minCount = diffValue / minute;

  if (monthCount >= 1) {
    return `in ${handlePlurality(Math.floor(monthCount), 'month')}`;
  } else if (dayCount >= 1) {
    return `in ${handlePlurality(Math.floor(dayCount), 'day')}`;
  } else if (hourCount >= 1) {
    return `in ${handlePlurality(Math.floor(hourCount), 'hour')}`;
  } else if (minCount >= 1) {
    return `in ${handlePlurality(Math.floor(minCount), 'minute')}`;
  }
  return 'in 1 minute';
};

export default getExpiryTime;

const isTokenIdReuse = (nftInfo: INftInfo) => {
  const symbolNumber = nftInfo?.nftSymbol && nftInfo.nftSymbol.split('-')[1];
  if (symbolNumber) {
    const totalSupply = nftInfo?.totalQuantity;
    return symbolNumber !== '0' && totalSupply > 1; // true is 1155; false is 721
  } else {
    console.error('Invalid symbol.');
  }
};

export const isERC721 = (nftInfo: INftInfo) => {
  return !isTokenIdReuse(nftInfo);
};

export function getExploreLink(
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
  chainName?: Chain,
): string {
  const target = (chainName && (chainName.toUpperCase() as 'AELF' | 'TDVV' | 'TDVW')) || SupportedELFChainId.MAIN_NET;
  const prefix = EXPLORE_URL(target);

  switch (type) {
    case 'transaction': {
      return `${prefix}tx/${data}`;
    }
    case 'token': {
      return `${prefix}token/${data}`;
    }
    case 'block': {
      return `${prefix}block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}address/${data}`;
    }
  }
}
