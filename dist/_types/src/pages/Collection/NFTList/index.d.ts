/// <reference types="react" />
import { BoxSizeEnum } from 'constants/collection.ts';
interface INFTListProps {
    collapsed: boolean;
    sizes: BoxSizeEnum;
    className?: string;
    dataSource: INftInfo[];
    hasSearch?: boolean;
    clearFilter?: () => void;
    loading: boolean;
    ELFToDollarRate: number;
}
interface ItemsCardProps {
    dataSource?: INftInfo;
    className?: string;
    priceClassName?: string;
    extraActions?: React.ReactNode;
    hiddenActions?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export declare function ItemsCard({ dataSource, className, priceClassName, onClick }: ItemsCardProps): import("react/jsx-runtime").JSX.Element;
export declare function NFTList({ sizes, collapsed, dataSource, hasSearch, clearFilter, loading, ELFToDollarRate, }: INFTListProps): import("react/jsx-runtime").JSX.Element;
export {};
