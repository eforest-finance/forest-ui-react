/// <reference types="react" />
export declare const BuyMessage: {
    title: string;
    portkey: {
        title: string;
        message: string;
    };
    default: {
        title: string;
        message: string;
    };
    errorMessage: {
        title: string;
        tips: string;
        description: string;
    };
};
declare const _default: import("react").NamedExoticComponent<{
    nftInfo: any;
    elfRate: number;
    onClose?: (() => void) | undefined;
    buyItem?: FormatListingType | undefined;
} & import("@ebay/nice-modal-react").NiceModalHocProps>;
export default _default;
