'use client';
import { Input as AntdInput, InputProps as AntdInputProps, InputRef } from 'antd';
import clsx from 'clsx';
import styles from './style.css';
import React, { Ref, forwardRef } from 'react';

export type SizeType = 'medium' | 'default' | 'large';

export const sizeStyle: Record<SizeType, string> = {
  medium: styles['forest-input-medium'],
  default: styles['forest-input-default'],
  large: styles['forest-input-large'],
};

export interface InputProps extends Omit<AntdInputProps, 'size'> {
  size?: SizeType;
}

export const initializationStyle = (props: { disabled?: boolean; status?: string }) => {
  if (props.disabled) {
    return '';
  }
  switch (props.status) {
    case 'error':
      return 'border--err';
    case 'warning':
      return '';
    default:
      return 'hover-color';
  }
};

export interface InputProps extends Omit<AntdInputProps, 'size'> {
  size?: SizeType;
}

function Input(props: InputProps, ref: Ref<InputRef> | undefined) {
  return (
    <AntdInput
      {...props}
      ref={ref}
      size="middle"
      className={clsx(
        initializationStyle({
          disabled: props.disabled,
          status: props.status,
        }),
        styles.input,
        sizeStyle[props.size || 'default'],
        props.className,
      )}
    />
  );
}
export default React.memo(forwardRef(Input));
