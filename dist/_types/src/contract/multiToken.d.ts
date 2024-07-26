import { IApproveParams, IContractError, IContractOptions, IGetBalanceParams, IGetTokenInfoParams } from './type';
export declare const GetBalance: (params: IGetBalanceParams, options?: IContractOptions) => Promise<{
    balance: number;
}>;
export declare const GetTokenInfo: (params: IGetTokenInfoParams, options?: IContractOptions) => Promise<{
    supply: number;
    totalSupply: number;
    decimals: number;
}>;
export declare const Approve: (params: IApproveParams, options?: IContractOptions) => Promise<IContractError>;
