import { StaticImageData } from 'next/image';
import React from 'react';
export interface INftInfoCard {
    logoImage?: string | StaticImageData | undefined;
    subTitle?: string;
    title?: string;
    extra?: string;
}
interface IProps {
    previewImage?: string | StaticImageData | undefined;
    info?: INftInfoCard;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
