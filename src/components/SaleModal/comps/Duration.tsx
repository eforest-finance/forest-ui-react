import DatePickerMobile from 'components/DatePickerMobile/index.tsx';
import moment, { Moment } from 'moment';
import { ReactComponent as CalendarLight } from 'assets/calendar.svg';
import { useDurationService, IDurationProps } from '../hooks/useDuration';
import { RangePickerProps } from 'antd/lib/date-picker';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Select, Option } from 'components/BaseSelect/Select/index.tsx';
import styles from './Duration.module.css';

export function Duration(props: IDurationProps) {
  const isSmallScreen = true;

  const {
    expirationType,
    setExpirationType,
    selectedDate,
    onSelectDateHandler,
    errorTip,
    mobileDateVisible,
    setMobileDateVisible,
    optionListArr,
  } = useDurationService(props);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    const maxExpireDate = moment().add(6, 'months');
    return current && (current < moment().startOf('day') || current > maxExpireDate);
  };
  const disabledTime = (current: Moment) => {
    const today = moment();

    if (current && current.isSame(today, 'day')) {
      const disResObj: {
        disabledHours?: () => number[];
        disabledMinutes?: () => number[];
        disabledSeconds?: () => number[];
      } = {
        disabledHours: () => Array.from({ length: today.hour() }, (_, i) => i),
      };

      if (current.isSame(today, 'hour')) {
        disResObj.disabledMinutes = () => Array.from({ length: today.minute() }, (_, i) => i);
      }

      if (current.isSame(today, 'seconds')) {
        disResObj.disabledSeconds = () => Array.from({ length: today.minute() }, (_, i) => i);
      }
      return disResObj;
    }

    return {};
  };

  const MobilePicker = () => {
    const maxExpireDate = moment().add(6, 'months').toDate();

    return (
      <>
        <div
          className={styles.timeBorder}
          onClick={() => {
            setMobileDateVisible(true);
          }}>
          <span className={styles.time}>{moment(selectedDate).format('YYYY/MM/DD hh:mm a')}</span>
        </div>
        <DatePickerMobile
          visible={mobileDateVisible}
          onCancel={() => {
            setMobileDateVisible(false);
          }}
          onConfirm={(e) => {
            onSelectDateHandler(moment(e));
            setMobileDateVisible(false);
          }}
          value={moment(selectedDate).toDate()}
          defaultValue={moment(selectedDate).toDate()}
          max={maxExpireDate}
        />
      </>
    );
  };

  const renderOptionLabel = (label: string) => {
    const CalendarIcon = CalendarLight;
    return (
      <div className="flex items-center">
        <CalendarIcon className="fill-textPrimary" />
        <span className="ml-2 text-textPrimary">{label}</span>
      </div>
    );
  };

  const renderSelectDateInfo = () => {
    return MobilePicker();
  };

  const renderError = () => {
    if (!errorTip) return null;
    return (
      <div className="mt-2 text-xs text-error flex justify-between">
        <span></span>
        <span>{errorTip}</span>
      </div>
    );
  };

  return (
    <div className={`${isSmallScreen ? 'mt-6' : 'mt-8'}`}>
      <span className="font-medium text-textPrimary text-lg rounded-lg">
        Duration
        {props.tooltip ? (
          <Tooltip title={props.tooltip}>
            <InfoCircleOutlined className="text-base ml-1" />
          </Tooltip>
        ) : null}
      </span>
      <div className={`mt-4 flex -mx-2 ${!isSmallScreen ? 'flex-row' : 'flex-col'}`}>
        <Select
          getPopupContainer={(v) => v}
          className={`!mx-2 !h-[56px] ${!isSmallScreen ? 'flex-1' : ''}`}
          value={expirationType}
          optionLabelProp="label"
          onChange={setExpirationType}>
          {optionListArr.map((option) => {
            return (
              <Option key={option.value} value={option.value} label={renderOptionLabel(option.label)}>
                <span>{option.label}</span>
              </Option>
            );
          })}
        </Select>
        {renderSelectDateInfo()}
      </div>
      {renderError()}
    </div>
  );
}
