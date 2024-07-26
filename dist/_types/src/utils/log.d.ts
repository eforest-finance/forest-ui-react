import { ITransactionLog } from 'contract/type.ts';
export declare function deserializeLog(log: ITransactionLog, proto: any): Promise<any>;
export declare function getProto(address: string, rpc: string): Promise<any>;
