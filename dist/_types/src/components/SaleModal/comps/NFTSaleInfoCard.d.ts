import { INftSaleInfoItem } from 'api/types';
interface INftSaleInfoCardProps {
    nftSaleInfo?: INftSaleInfoItem;
    listItems?: number;
    listingPrice?: number | string;
    listingUSDPrice?: number | string;
    size?: 'ultra' | '';
    isERC1155?: boolean;
}
interface INftSaleInfoCardForDelProps extends INftSaleInfoCardProps {
    listings?: number | string;
}
export declare function NFTSaleInfoCard({ nftSaleInfo, listItems, listingPrice, listingUSDPrice, size, isERC1155, }: INftSaleInfoCardProps): import("react/jsx-runtime").JSX.Element;
export declare function NFTSaleInfoCardForDelListing({ nftSaleInfo, listItems, listings, size, }: INftSaleInfoCardForDelProps): import("react/jsx-runtime").JSX.Element;
export {};
