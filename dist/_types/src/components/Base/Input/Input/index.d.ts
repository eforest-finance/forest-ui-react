import { InputProps as AntdInputProps, InputRef } from 'antd';
import React from 'react';
export type SizeType = 'medium' | 'default' | 'large';
export declare const sizeStyle: Record<SizeType, string>;
export interface InputProps extends Omit<AntdInputProps, 'size'> {
    size?: SizeType;
}
export declare const initializationStyle: (props: {
    disabled?: boolean;
    status?: string;
}) => "" | "border--err" | "hover-color";
export interface InputProps extends Omit<AntdInputProps, 'size'> {
    size?: SizeType;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>>;
export default _default;
