import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
declare class Request {
    instance: AxiosInstance;
    baseConfig: AxiosRequestConfig;
    constructor(config: AxiosRequestConfig);
    resetBaseUrl(baseUrl: string): void;
    request(config: AxiosRequestConfig): Promise<AxiosResponse>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
declare const cmsRequest: Request;
declare const tokenRequest: Request;
declare const commonApiRequest: Request;
export default commonApiRequest;
export { cmsRequest, tokenRequest };
