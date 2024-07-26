import { fetchListings } from 'api/fetch.ts';
import getExpiryTime from './unit';

interface IProps {
  page?: number;
  pageSize?: number;
  symbol: string;
  excludedAddress?: string;
  address?: string;
  chainId: Chain;
}

const getListings = async ({ page = 1, pageSize = 10, symbol, address, excludedAddress, chainId }: IProps) => {
  try {
    const result = await fetchListings({
      chainId,
      symbol,
      skipCount: (page - 1) * pageSize,
      maxResultCount: pageSize,
      excludedAddress,
      address,
    });

    if (!result) {
      return false;
    }

    const resultItem = result?.items;
    const resultTotalCount = result?.totalCount;
    const showList = resultItem.map((item: any): FormatListingType => {
      const price = item.whitelistPrices !== null ? item.whitelistPrices : item.prices;
      return {
        key: item.publicTime.toString(),
        purchaseToken: { symbol: item.purchaseToken.symbol.toLocaleUpperCase() },
        decimals: item.purchaseToken.decimals ?? 8,
        price,
        quantity: item.quantity,
        ownerAddress: item?.ownerAddress || '',
        expiration: getExpiryTime(item.endTime),
        fromName: item?.owner?.name || '--',
        whitelistHash: item.whitelistId,
        startTime: item.startTime,
        endTime: item.endTime,
      };
    });

    return {
      list: showList || [],
      totalCount: resultTotalCount ?? 0,
    };
  } catch (error) {
    return false;
  }
};

export default getListings;
