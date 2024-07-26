import React, { ReactNode } from 'react';
import { INftInfoListCard } from './NftInfoListCard';
export declare const transactionPending = "Pending transaction confirmation";
export declare const confirmationAuto = "Please wait for auto confirmation.";
interface IProps {
    title?: string;
    nftInfo: INftInfoListCard;
    buttonConfig?: {
        btnText?: string;
        onConfirm?: Function;
    }[] | false;
    initialization?: <T, R>(params?: T) => Promise<void | R>;
    onClose?: <T>(params?: T) => void;
    content?: {
        title?: string | ReactNode;
        content?: string | string[] | ReactNode;
    };
}
declare const _default: React.FC<IProps & import("@ebay/nice-modal-react").NiceModalHocProps>;
export default _default;
