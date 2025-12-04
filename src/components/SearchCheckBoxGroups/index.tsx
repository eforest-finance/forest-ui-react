import { Checkbox, List } from 'antd';
import Input from '../Base/Input';
import { useState } from 'react';
import styles from './style.module.css';
import { ReactComponent as ClockCircleOutlined } from 'assets/search-icon.svg';
import { ReactComponent as Clear } from 'assets/Clear.svg';
import VirtualList from 'rc-virtual-list';
import { ICollectionTraitValue } from 'api/types';
import { sleep } from 'utils/unit.ts';
import { FilterKeyEnum, FilterType } from 'constants/collection.ts';
import { formatTokenPrice } from 'pages/Collection/util.ts';

function SearchCheckBoxGroups({ dataSource = [], values = [], parentKey, onChange }: SearchCheckboxChoiceProps) {
  const [searchItems, setSearchItems] = useState<ICollectionTraitValue[]>(dataSource.slice(0));
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLoading(true);
    const keyWord = (e.target as HTMLInputElement).value.trim().toLowerCase();
    let res = dataSource;
    if (keyWord) {
      res = dataSource.filter((itm) => String(itm.value).toLowerCase() === keyWord);
    }
    await sleep(300);
    setSearchLoading(false);
    setSearchItems(res);
  };

  const containerHeight = Math.min(searchItems.length, 10) * 54;
  const toggleSelect = (value: string, checked: boolean) => {
    const index = values.findIndex((itm) => itm === value);
    let res = [...values];
    if (checked && index === -1) {
      res = values.concat(value);
    }
    if (!checked && index > -1) {
      res = values.slice(0, index).concat(values.slice(index + 1));
    }

    const data = dataSource
      ?.filter((item) => {
        return res.some((s) => s === item.value);
      })
      .map((itm) => ({ value: itm.value, label: itm.value }));

    onChange?.({
      [`${FilterKeyEnum.Traits}-${parentKey}`]: {
        type: FilterType.Checkbox,
        data,
      },
    });
  };

  return (
    <List
      className={styles['search-list']}
      split={false}
      itemLayout="vertical"
      loading={searchLoading}
      locale={{
        emptyText: 'No such traits found',
      }}
      header={
        <Input
          size="medium"
          prefix={<ClockCircleOutlined />}
          allowClear={{ clearIcon: <Clear /> }}
          placeholder="Search"
          onChange={search}
        />
      }>
      {searchItems.length ? (
        <VirtualList data={searchItems} height={containerHeight} itemHeight={54} itemKey="value">
          {(item) => (
            <List.Item extra={formatTokenPrice(item.itemsCount)}>
              <Checkbox
                key={item.value}
                value={item.value}
                checked={values.includes(item.value)}
                onChange={(e) => {
                  toggleSelect(e.target.value, e.target.checked);
                }}>
                {item.value}
              </Checkbox>
            </List.Item>
          )}
        </VirtualList>
      ) : null}
    </List>
  );
}

export default SearchCheckBoxGroups;
