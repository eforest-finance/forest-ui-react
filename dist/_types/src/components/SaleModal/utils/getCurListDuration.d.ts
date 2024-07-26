import { IListDuration } from 'contract/type';
import { IDurationData } from '../hooks/useDuration';
declare const getCurListDuration: (minutes?: number) => IListDuration;
export declare const getMinutesBySelectDuration: (duration: IDurationData) => number;
export declare const getDurationParamsForListingContractByDuration: (duration: IDurationData) => IListDuration;
export default getCurListDuration;
