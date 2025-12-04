interface IExploreItemsProps {
    nftCollectionId: string;
    ELFToDollarRate: number;
    totalChange?: (value: number) => void;
}
export default function ExploreItem({ nftCollectionId, ELFToDollarRate }: IExploreItemsProps): import("react/jsx-runtime").JSX.Element;
export {};
