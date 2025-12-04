export interface IWebLoginArgs {
    address: string;
    chainId: string;
}
export type ChainId = 'AELF' | 'tDVV' | 'tDVW';
type WebLoginInterface = any;
export interface CallContractParams<T> {
    contractAddress: string;
    methodName: string;
    args: T;
    options?: {
        chainId?: ChainId;
    };
}
export interface IWebLoginArgs {
    address: string;
    chainId: string;
}
type MethodType = <T, R>(params: CallContractParams<T>) => Promise<R>;
export default class WebLoginInstance {
    contract: any;
    address: string | undefined;
    chainId: string | undefined;
    private static instance;
    private context;
    private aelfSendMethod?;
    private aelfViewMethod?;
    private tdvvSendMethod?;
    private tdvvViewMethod?;
    private tdvwSendMethod?;
    private tdvwViewMethod?;
    constructor(options?: IWebLoginArgs);
    static get(): WebLoginInstance;
    static set(instance: any): void;
    setWebLoginContext(context: WebLoginInterface): void;
    setMethod({ chain, sendMethod, viewMethod }: {
        chain: Chain;
        sendMethod: MethodType;
        viewMethod: MethodType;
    }): void;
    setContractMethod(contractMethod: {
        chain: Chain;
        sendMethod: MethodType;
        viewMethod: MethodType;
    }[]): void;
    getWebLoginContext(): any;
    contractSendMethod<T, R>(chain: Chain, params: CallContractParams<T>): Promise<R>;
    contractViewMethod<T, R>(chain: Chain, params: CallContractParams<T>): Promise<R>;
    callContract<T>(params: CallContractParams<T>): any;
}
export declare const webLoginInstance: WebLoginInstance;
export {};
