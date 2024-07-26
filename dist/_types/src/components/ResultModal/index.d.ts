import React, { ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { INftInfoList } from '../PromptModal/NftInfoList';
import { INftInfoCard } from '../PromptModal/NftInfoCard';
interface IProps {
    previewImage?: string | StaticImageData;
    title?: string;
    description?: string | ReactNode | string[];
    hideButton?: boolean;
    buttonInfo?: {
        btnText?: string;
        openLoading?: boolean;
        onConfirm?: <T, R>(params?: T) => R | void | Promise<void>;
    };
    info: INftInfoCard;
    jumpInfo?: {
        url?: string;
        btnText?: string;
    };
    error?: {
        title?: string | ReactNode;
        description?: string | ReactNode | string[];
        list?: INftInfoList[];
    };
    onCancel?: <T, R>(params?: T) => R | void;
}
declare const _default: React.FC<IProps & import("@ebay/nice-modal-react").NiceModalHocProps>;
export default _default;
