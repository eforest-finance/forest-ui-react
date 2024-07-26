import { DatePicker } from 'antd-mobile';
import { MILLISECONDS_PER_HALF_HOUR } from 'constants/time.ts';
import moment from 'moment';
import { useMemo } from 'react';
import styles from './style.module.css';

export default function DatePickerMobile(options: {
  visible: boolean;
  onConfirm: (value: Date) => void;
  onCancel: () => void;
  value?: Date;
  className?: string;
  defaultValue: Date;
  max?: Date;
}) {
  const { visible, onConfirm, onCancel, value, className, defaultValue, max } = options;

  const currentDefaultValue = useMemo(() => {
    return new Date(moment(defaultValue).valueOf() + MILLISECONDS_PER_HALF_HOUR);
  }, [defaultValue]);

  return (
    <DatePicker
      className={`${styles['date-picker-mobile']} ${className}`}
      visible={visible}
      confirmText="Done"
      cancelText="Cancel"
      precision="minute"
      onCancel={onCancel}
      onConfirm={onConfirm}
      min={new Date()}
      max={max}
      value={value}
      defaultValue={currentDefaultValue}
    />
  );
}
