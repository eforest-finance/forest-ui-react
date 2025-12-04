import { MenuProps } from 'antd';
declare function FilterBoardForPC(props: MenuProps): import("react/jsx-runtime").JSX.Element;
interface IDropMenu extends MenuProps {
    showDropMenu: boolean;
    onCloseHandler: () => void;
    clearAll: () => void;
    doneChange: () => void;
    afterOpenChange?: () => void;
    titleTxt?: string;
    wrapClassName?: string;
}
declare const FilterBoardForPhone: ({ showDropMenu, items, onCloseHandler, doneChange, clearAll, titleTxt, ...params }: IDropMenu) => import("react/jsx-runtime").JSX.Element;
export { FilterBoardForPC, FilterBoardForPhone };
