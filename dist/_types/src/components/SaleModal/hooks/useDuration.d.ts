/// <reference types="react" />
import moment, { Moment } from 'moment';
export interface IDurationData {
    type?: 'date' | 'hours' | 'months';
    value?: Date | number | string;
    showPrevious?: boolean;
}
export interface IDurationProps {
    onChange?: (data: IDurationData) => void;
    defaultExpirationData?: IDurationData;
    tooltip?: string;
    checkDateValidate?: (date: Moment) => string;
}
export declare const optionList: {
    label: string;
    value: string;
}[];
export declare function useDurationService({ onChange, defaultExpirationData, checkDateValidate: checkDateValidateProp, }: IDurationProps): {
    selectedDate: moment.Moment;
    setSelectedDate: import("react").Dispatch<import("react").SetStateAction<moment.Moment>>;
    expirationType: string;
    setExpirationType: import("react").Dispatch<import("react").SetStateAction<string>>;
    mobileDateVisible: boolean;
    setMobileDateVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    onSelectDateHandler: (date: Moment) => void;
    errorTip: string | undefined;
    showPreviousText: boolean;
    optionListArr: {
        label: string;
        value: string;
    }[];
};
