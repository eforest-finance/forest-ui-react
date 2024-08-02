export interface UseSellProps {
    nftInfo: any;
    onViewNft?: () => void;
}
export declare function useSell(props: UseSellProps): {
    sell: () => void;
};
