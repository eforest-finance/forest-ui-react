/// <reference types="react" />
export declare const enum emptyEnum {
    nft = "nft",
    collection = "collection"
}
declare function TableEmpty({ searchText, type, clearFilter, }: {
    searchText: string;
    type?: emptyEnum;
    clearFilter?: () => void;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof TableEmpty>;
export default _default;
