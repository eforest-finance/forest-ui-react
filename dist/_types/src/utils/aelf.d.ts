import { IPrice } from 'contract/type.ts';
export declare const DEFAULT_ERROR = "Something went wrong. Please try again later.";
export declare const getRpcUrls: () => {
    [x: number]: any;
};
export declare function getAElf(rpcUrl?: string): any;
export declare function getTxResult(TransactionId: string, chainId: Chain, reGetCount?: number, retryCountWhenNotExist?: number): Promise<any>;
export declare const checkELFApprove: (options: {
    chainId?: Chain;
    address: string;
    spender: string;
    price: IPrice;
    quantity: number;
}) => Promise<boolean>;
export declare const approve: (spender: string, symbol: string, amount: string, chainId?: Chain, batchApproveNFT?: boolean) => Promise<boolean>;
export declare function MessageTxToExplore(txId: string, chainId: Chain, type?: 'success' | 'error' | 'warning'): Promise<void>;
export declare function shortenString(address: string | null, chars?: number): string;
export declare const checkNFTApprove: (options: {
    chainId?: Chain;
    address: string;
    spender: string;
    symbol: string;
    amount: number;
}) => Promise<boolean>;
