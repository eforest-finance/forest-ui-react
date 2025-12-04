import { IActionDetail, IDropListParams, IDropListRes } from './types';
export declare const fetchRecommendAction: () => Promise<IActionDetail[]>;
export declare const fetchDropList: ({ pageIndex, pageSize, state, }: IDropListParams) => Promise<IDropListRes>;
