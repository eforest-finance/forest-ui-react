import { MultipleItemType, SingleItemType } from 'types';
import styles from './index.css';
import { Select, Option, SelectProps } from './Select';
export interface BaseSelectProps {
  dataSource: SingleItemType | MultipleItemType;
}
export default function BaseSelect({ dataSource, ...params }: SelectProps & BaseSelectProps) {
  return (
    <Select className={styles['base-items-select']} getPopupContainer={(v) => v} {...params}>
      {dataSource?.data?.map?.((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
}
