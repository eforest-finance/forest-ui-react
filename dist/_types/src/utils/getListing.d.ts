interface IProps {
    page?: number;
    pageSize?: number;
    symbol: string;
    excludedAddress?: string;
    address?: string;
    chainId: Chain;
}
declare const getListings: ({ page, pageSize, symbol, address, excludedAddress, chainId }: IProps) => Promise<false | {
    list: any;
    totalCount: any;
}>;
export default getListings;
