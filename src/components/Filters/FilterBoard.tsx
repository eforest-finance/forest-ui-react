import { Divider, Drawer, Menu, MenuProps } from 'antd';
import styles from './style.module.css';
import clsx from 'clsx';
import { useMemo } from 'react';
import Close from 'components/Close/index.tsx';
import { ReactComponent as ExpandIcon } from 'assets/item-arrow-up.svg';
import BaseButton from 'components/Base/Button/index.tsx';

function FilterBoardForPC(props: MenuProps) {
  return (
    <Menu
      {...props}
      expandIcon={
        <div>
          <ExpandIcon className={clsx(styles.menu__expand__icon)} />
        </div>
      }
      className={`${styles['items-side-menu']}`}
      selectable={false}
      mode="inline"
      getPopupContainer={(v) => v}
    />
  );
}

interface IDropMenu extends MenuProps {
  showDropMenu: boolean;
  onCloseHandler: () => void;
  clearAll: () => void;
  doneChange: () => void;
  afterOpenChange?: () => void;
  titleTxt?: string;
  wrapClassName?: string;
}

const FilterBoardForPhone = ({
  showDropMenu,
  items,
  onCloseHandler,
  doneChange,
  clearAll,
  titleTxt = 'Filter',
  ...params
}: IDropMenu) => {
  const clearAllDom = useMemo(() => {
    return (
      <>
        <Divider className="!m-0 !mt-0 border-box" />
        <div className="flex items-center px-2 py-4">
          <BaseButton size="ultra" className="flex-1 mx-2" onClick={clearAll}>
            Clear All
          </BaseButton>
          <BaseButton size="ultra" className="flex-1 mx-2" type="primary" onClick={doneChange}>
            Done
          </BaseButton>
        </div>
      </>
    );
  }, [clearAll, doneChange]);
  return (
    <Drawer
      className={`${styles['elf-dropdown-phone-dark']} ${params.wrapClassName || ''}`}
      placement="top"
      maskClosable={false}
      title={
        <div className="flex items-center justify-between pr-[20px]">
          <span className="text-[24px] leading-[32px] font-medium text-[var(--text-item)]">{titleTxt}</span>
          <Close onClose={onCloseHandler} />
        </div>
      }
      closeIcon={null}
      push={false}
      open={showDropMenu}
      height={'100%'}
      footer={clearAllDom}
      headerStyle={{ paddingLeft: 16, height: 64, paddingTop: 24, paddingBottom: 24, paddingRight: 0 }}
      bodyStyle={{ padding: 0 }}
      footerStyle={{ padding: 0, border: 'none' }}
      onClose={onCloseHandler}>
      <div className="px-[8px] pt-[16px]">
        <FilterBoardForPC items={items} {...params} />
      </div>
    </Drawer>
  );
};

export { FilterBoardForPC, FilterBoardForPhone };
