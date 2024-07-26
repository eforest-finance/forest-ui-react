import { ICollecionGenerationInfo, ICollectionRarityInfo, ICollectionTraitInfo } from 'api/types';
interface IFilterContainerProps {
    options?: any[];
    clearAll: () => void;
    onClose: () => void;
    onFilterChange: (data: ItemsSelectSourceType) => void;
    open: boolean;
    traitsInfo?: ICollectionTraitInfo[];
    generationInfos?: ICollecionGenerationInfo[];
    rarityInfos?: ICollectionRarityInfo[];
    mineInfos?: any[];
    collectionInfos?: any[];
    filterSelect: IFilterSelect;
    filterList: (CheckboxItemType | RangeItemType | SearchCheckBoxItemType)[];
    mobileMode?: boolean;
    collapsedWidth?: number;
    pcRenderMode?: string;
    toggleOpen?: () => void;
}
export declare function FilterContainer({ clearAll, onClose, open, traitsInfo, generationInfos, rarityInfos, mineInfos, collectionInfos, onFilterChange, filterSelect, filterList, mobileMode, pcRenderMode, toggleOpen, }: IFilterContainerProps): import("react/jsx-runtime").JSX.Element;
export {};
