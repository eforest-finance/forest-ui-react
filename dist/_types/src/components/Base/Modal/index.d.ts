import React from 'react';
import { ModalProps as AntdModalProps } from 'antd';
export interface ModalProps extends AntdModalProps {
    subTitle?: string;
}
declare function Modal(props: ModalProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Modal>;
export default _default;
