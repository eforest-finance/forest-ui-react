import React from 'react';
import { ButtonProps as AntdButtonProps } from 'antd';
import { SizeType as AntdSizeType } from 'antd/lib/config-provider/SizeContext';
type ExtSizeType = 'ultra' | 'mini';
type SizeType = AntdSizeType | ExtSizeType;
interface ButtonProps extends Omit<AntdButtonProps, 'size'> {
    size?: SizeType;
    isFull?: boolean;
    millisecondOfThrottle?: number;
}
declare function Button(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Button>;
export default _default;
