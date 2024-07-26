import { webLoginInstance } from './contractInstance';
import {
  ContractMethodType,
  IApproveParams,
  IContractError,
  IContractOptions,
  IGetBalanceParams,
  IGetTokenInfoParams,
  ISendResult,
} from './type';
import { Store } from 'provider/class/store.ts';

import { SupportedELFChainId } from 'constants/collection.ts';
import { sleep } from 'utils/unit.ts';
import { getTxResult } from 'utils/aelf.ts';

const multiTokenContractRequest = async <T, R>(
  method: string,
  params: T,
  options?: IContractOptions,
): Promise<R | ISendResult> => {
  const { aelfInfo } = Store.getInstance().getStore();
  console.log('aelfInfo:', aelfInfo);

  const addressList = {
    main: aelfInfo?.mainChainAddress,
    side: aelfInfo?.sideChainAddress,
  };

  try {
    const address = (options?.chain === SupportedELFChainId.MAIN_NET
      ? addressList.main
      : addressList.side) as unknown as string;
    const curChain = options?.chain || aelfInfo?.curChain;

    console.log('=====multiTokenContractRequest type: ', method, options?.type);
    console.log('=====multiTokenContractRequest address: ', method, address);
    console.log('=====multiTokenContractRequest curChain: ', method, curChain);
    console.log('=====multiTokenContractRequest params: ', method, params);
    console.log('=====multiTokenContractRequest webLoginInstance: ', webLoginInstance);

    if (options?.type === ContractMethodType.VIEW) {
      const res: R = await webLoginInstance.contractViewMethod(curChain, {
        contractAddress: address,
        methodName: method,
        args: params,
      });

      console.log('=====multiTokenContractRequest res: ', method, res);

      const result = res as IContractError;
      if (result?.error || result?.code || result?.Error) {
        console.error(result);
        return Promise.reject('request fail');
      }

      return Promise.resolve(res);
    } else {
      const res: R = await webLoginInstance.contractSendMethod(curChain, {
        contractAddress: address,
        methodName: method,
        args: params,
      });

      console.log('=====multiTokenContractRequest res: ', method, res);

      const result = res as IContractError;

      if (result?.error || result?.code || result?.Error) {
        console.error(result);

        return Promise.reject('request fail');
      }

      const { transactionId, TransactionId } = result.result || result;
      const resTransactionId = TransactionId || transactionId;
      await sleep(1000);
      const transaction = await getTxResult(resTransactionId as string, curChain);

      console.log('=====multiTokenContractRequest transaction: ', method, transaction);

      return Promise.resolve({ TransactionId: transaction.TransactionId, TransactionResult: transaction.txResult });
    }
  } catch (error) {
    console.error('=====multiTokenContractRequest error:', method, JSON.stringify(error));
    const resError = error as IContractError;
    console.error(resError);

    return Promise.reject('request fail');
  }
};

export const GetBalance = async (
  params: IGetBalanceParams,
  options?: IContractOptions,
): Promise<{ balance: number }> => {
  console.log('GetBalance---------1');

  try {
    const res = (await multiTokenContractRequest('GetBalance', params, {
      ...options,
      type: ContractMethodType.VIEW,
    })) as { balance: number };
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetTokenInfo = async (
  params: IGetTokenInfoParams,
  options?: IContractOptions,
): Promise<{ supply: number; totalSupply: number; decimals: number }> => {
  try {
    const res = (await multiTokenContractRequest('GetTokenInfo', params, {
      ...options,
      type: ContractMethodType.VIEW,
    })) as { supply: number; totalSupply: number; decimals: number };
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Approve = async (params: IApproveParams, options?: IContractOptions): Promise<IContractError> => {
  try {
    const res = (await multiTokenContractRequest('Approve', params, {
      ...options,
    })) as IContractError;
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
