import { SelectProps as AntdSelectProps } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { SizeType } from 'components/Base/Input/Input';
export interface SelectProps extends Omit<AntdSelectProps, 'size'> {
    size?: SizeType;
}
export declare function Option(props: OptionProps): import("react/jsx-runtime").JSX.Element;
export declare function Select(props: SelectProps): import("react/jsx-runtime").JSX.Element;
