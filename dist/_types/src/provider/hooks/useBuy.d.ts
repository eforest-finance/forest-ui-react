export interface UseBuyProps {
    nftInfo: any;
    onViewNft?: () => void;
}
export declare function useBuy(props: UseBuyProps): {
    buyNow: (buyItem?: FormatListingType) => void;
};
