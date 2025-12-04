import { BoxSizeEnum } from '@/constants/collection.ts';
import { SelectProps } from 'components/BaseSelect/Select';
import { InputProps } from 'components/Base/Input';
interface ICollectionItemsSearch {
    size: BoxSizeEnum;
    hiddenFilter?: boolean;
    hiddenSize?: boolean;
    collapsed: boolean;
    searchParams: InputProps;
    sizeChange: (value: BoxSizeEnum) => void;
    collapsedChange: () => void;
    selectProps: SelectProps;
    selectTagCount?: number;
    extraInfo?: string;
}
export default function CollectionItemsSearch(params: ICollectionItemsSearch): import("react/jsx-runtime").JSX.Element;
export {};
