import CollectionSearch from '../CollectionSearch';
import styles from './styles.module.css';
import clsx from 'clsx';
import BaseSelect from '../BaseSelect';
// import LargeIcon from 'assets/images/explore/large.svg';
import { ReactComponent as SmallIcon } from 'assets/small.svg';
import { ReactComponent as DetailIcon } from 'assets/detail-icon.svg';
import { BoxSizeEnum, dropDownCollectionsMenu } from '@/constants/collection.ts';
import { SelectProps } from 'components/BaseSelect/Select';
import { InputProps } from 'components/Base/Input';
import { FilterButton } from 'components/Filters/Button/index.tsx';

interface ICollectionItemsSearch {
  size: BoxSizeEnum;
  hiddenFilter?: boolean;
  hiddenSize?: boolean;
  collapsed: boolean;
  searchParams: InputProps;
  sizeChange: (value: BoxSizeEnum) => void;
  collapsedChange: () => void;
  selectProps: SelectProps;
  selectTagCount?: number;
  extraInfo?: string;
}

export default function CollectionItemsSearch(params: ICollectionItemsSearch) {
  const isLG = true;
  const {
    size = BoxSizeEnum.small,
    hiddenFilter,
    hiddenSize,
    collapsed,
    searchParams,
    selectProps,
    sizeChange,
    collapsedChange,
    selectTagCount,
    extraInfo,
  } = params;
  return (
    <>
      <div className={styles.collection__search}>
        {!hiddenFilter ? (
          <div
            className={clsx(
              'flex justify-between items-center',
              !isLG ? 'mr-8' : 'mr-[12px]',
              !collapsed && !isLG ? 'w-[360px]' : 'w-auto',
            )}>
            <FilterButton onClick={collapsedChange} badge={selectTagCount || ''} showBadge={!!selectTagCount && isLG} />
            {extraInfo && !collapsed && !isLG ? (
              <span className=" text-base font-medium text-textPrimary">{extraInfo}</span>
            ) : null}
          </div>
        ) : null}

        <div className={clsx('flex-1', !isLG && 'mr-[32px]', 'search-bar')}>
          <CollectionSearch {...searchParams} />
        </div>
        {!isLG && (
          <div className="base-select">
            <BaseSelect dataSource={dropDownCollectionsMenu} {...selectProps} />
          </div>
        )}

        {!isLG && !hiddenSize && (
          <div className={styles.size_container}>
            <div
              className={clsx(styles['btn-icon'], size === BoxSizeEnum.details && styles.active)}
              onClick={() => {
                sizeChange(BoxSizeEnum.details);
              }}>
              {/* <DetailIcon /> */}
            </div>
            <div
              className={clsx(styles['btn-icon'], size === BoxSizeEnum.large && styles.active)}
              onClick={() => {
                sizeChange(BoxSizeEnum.large);
              }}>
              {/* <LargeIcon /> */}
            </div>
            <div
              className={clsx(styles['btn-icon'], size === BoxSizeEnum.small && styles.active)}
              onClick={() => {
                sizeChange(BoxSizeEnum.small);
              }}>
              {/* <SmallIcon /> */}
            </div>
          </div>
        )}
      </div>
      {isLG && !hiddenSize && (
        <div className="flex mb-[16px] base-select">
          <BaseSelect className="flex-1" dataSource={dropDownCollectionsMenu} {...selectProps} />

          <div className={styles['size_container']}>
            <div
              className={clsx(styles['btn-icon'], size === BoxSizeEnum.details && 'bg-fillHoverBg')}
              onClick={() => {
                sizeChange(BoxSizeEnum.details);
              }}>
              <DetailIcon className="w-[24px] h-[24px]" />
            </div>
            <div
              className={clsx(styles['btn-icon'], size === BoxSizeEnum.small && 'bg-fillHoverBg')}
              onClick={() => {
                sizeChange(BoxSizeEnum.small);
              }}>
              <SmallIcon className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
