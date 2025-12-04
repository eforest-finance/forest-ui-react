import { IBatchDeListParams } from 'contract/type';
declare const batchDeList: (params: IBatchDeListParams, chainId: Chain) => Promise<boolean>;
export default batchDeList;
