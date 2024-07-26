import { MultipleItemType, SingleItemType } from 'types';
import { SelectProps } from './Select';
export interface BaseSelectProps {
    dataSource: SingleItemType | MultipleItemType;
}
export default function BaseSelect({ dataSource, ...params }: SelectProps & BaseSelectProps): import("react/jsx-runtime").JSX.Element;
