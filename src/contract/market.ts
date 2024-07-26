import { webLoginInstance } from './contractInstance';
import {
  ContractMethodType,
  IBatchBuyNowParams,
  IBatchCancelListParams,
  IBatchCancelOfferListParams,
  IBatchDeListParams,
  ICancelOfferParams,
  IContractError,
  IContractOptions,
  IDealParams,
  IDelistParams,
  IGetTotalEffectiveListedNFTAmountParams,
  IGetTotalOfferAmountParams,
  IListWithFixedPriceParams,
  IListedNFTInfo,
  IMakeOfferParams,
  ISendResult,
} from './type';

import { Store } from 'provider/class/store.ts';

import { SupportedELFChainId } from 'constants/collection.ts';
import { sleep } from 'utils/unit.ts';
import { getTxResult } from 'utils/aelf.ts';

const marketContractRequest = async <T, R>(
  method: string,
  params: T,
  options?: IContractOptions,
): Promise<R | ISendResult> => {
  const { aelfInfo } = Store.getInstance().getStore();
  console.log('aelfInfo:', aelfInfo);

  const addressList = {
    main: aelfInfo?.marketMainAddress,
    side: aelfInfo?.marketSideAddress,
  };

  try {
    const address = (options?.chain === SupportedELFChainId.MAIN_NET
      ? addressList.main
      : addressList.side) as unknown as string;
    const curChain = options?.chain || aelfInfo?.curChain;

    console.log('=====marketContractRequest webLoginInstance', webLoginInstance);

    console.log('=====marketContractRequest type: ', method, options?.type);
    console.log('=====marketContractRequest address: ', method, address);
    console.log('=====marketContractRequest curChain: ', method, curChain);
    console.log('=====marketContractRequest params: ', method, params);

    if (options?.type === ContractMethodType.VIEW) {
      const res: R = await webLoginInstance.contractViewMethod(curChain, {
        contractAddress: address,
        methodName: method,
        args: params,
      });

      console.log('=====marketContractRequest res: ', method, res);

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

      console.log('=====marketContractRequest res: ', method, res);

      const result = res as IContractError;

      console.log('=====marketContractRequest result: ', method, JSON.stringify(result), result?.Error);

      if (result?.error || result?.code || result?.Error) {
        console.error('======>', result);

        return Promise.reject('request fail');
      }

      const { transactionId, TransactionId } = result.result || result;
      const resTransactionId = TransactionId || transactionId;
      console.log('resTransactionId：', resTransactionId);

      await sleep(1000);
      const transaction = await getTxResult(resTransactionId as string, curChain);

      console.log('=====marketContractRequest transaction: ', method, transaction);

      return Promise.resolve({ TransactionId: transaction.TransactionId, TransactionResult: transaction.txResult });
      // return Promise.resolve({ TransactionId: TransactionId, TransactionResult: {} });
    }
  } catch (error) {
    console.error('=====marketContractRequest error: ', method, JSON.stringify(error), error);
    const resError = error as IContractError;
    console.error(resError);
    return Promise.reject('request fail');
  }
};

export const GetTotalOfferAmount = async (
  params: IGetTotalOfferAmountParams,
  options?: IContractOptions,
): Promise<
  IContractError & {
    allowance: number;
    totalAmount: number;
  }
> => {
  try {
    const res = (await marketContractRequest('GetTotalOfferAmount', params, {
      ...options,
      type: ContractMethodType.VIEW,
    })) as IContractError & {
      allowance: number;
      totalAmount: number;
    };
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BatchBuyNow = async (
  params: IBatchBuyNowParams,
  options?: IContractOptions,
): Promise<IContractError & ISendResult> => {
  try {
    const res = (await marketContractRequest('BatchBuyNow', params, options)) as IContractError & ISendResult;
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetListedNFTInfoList = async (
  params: {
    symbol: string;
    owner: string;
  },
  options?: IContractOptions,
): Promise<IContractError & { value: IListedNFTInfo[] }> => {
  try {
    const res = (await marketContractRequest('GetListedNFTInfoList', params, {
      ...options,
      type: ContractMethodType.VIEW,
    })) as IContractError & { value: IListedNFTInfo[] };
    return Promise.resolve(res);
  } catch (_) {
    return Promise.reject(null);
  }
};

export const GetTotalEffectiveListedNFTAmount = async (
  params: IGetTotalEffectiveListedNFTAmountParams,
  options?: IContractOptions,
): Promise<
  IContractError & {
    allowance: number;
    totalAmount: number;
  }
> => {
  try {
    const res = (await marketContractRequest('GetTotalEffectiveListedNFTAmount', params, {
      ...options,
      type: ContractMethodType.VIEW,
    })) as IContractError & {
      allowance: number;
      totalAmount: number;
    };
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ListWithFixedPrice = async (
  params: IListWithFixedPriceParams,
  options?: IContractOptions,
): Promise<IContractError> => {
  try {
    const res = (await marketContractRequest('ListWithFixedPrice', params, options)) as IContractError;
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
