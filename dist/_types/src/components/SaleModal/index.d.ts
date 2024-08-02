/// <reference types="react" />
interface ISaleModalProps {
    nftInfo: INftInfo;
    type: 'add' | 'edit';
    defaultData: {
        [key: string]: any;
    };
    onViewNft?: () => void;
}
export declare function SaleModalERC721Constructor({ nftInfo, type, defaultData }: ISaleModalProps): import("react/jsx-runtime").JSX.Element;
export declare function SaleModalERC1155Constructor({ nftInfo, type, defaultData, onViewNft }: ISaleModalProps): import("react/jsx-runtime").JSX.Element;
export declare const SaleModalERC1155: import("react").FC<ISaleModalProps & import("@ebay/nice-modal-react").NiceModalHocProps>;
export declare const SaleModalForERC721: import("react").FC<ISaleModalProps & import("@ebay/nice-modal-react").NiceModalHocProps>;
export {};
