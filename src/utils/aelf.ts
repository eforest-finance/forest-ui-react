import { SupportedELFChainId } from 'constants/collection.ts';
import { Store } from 'provider/class/store.ts';
import AElf from 'aelf-sdk';
import { sleep } from './unit';
import { IContractError, IPrice } from 'contract/type.ts';
import BigNumber from 'bignumber.js';
import { message } from 'antd';
import { GetTotalEffectiveListedNFTAmount, GetTotalOfferAmount } from 'contract/market.ts';
import { Approve } from 'contract/multiToken.ts';
import { messageHTML } from './messageHtml';

export const DEFAULT_ERROR = 'Something went wrong. Please try again later.';

export const getRpcUrls = () => {
  const { aelfInfo: info } = Store.getInstance().getStore();
  return {
    [SupportedELFChainId.MAIN_NET]: info?.rpcUrlAELF,
    [SupportedELFChainId.TDVV_NET]: info?.rpcUrlTDVV,
    [SupportedELFChainId.TDVW_NET]: info?.rpcUrlTDVW,
  };
};

const httpProviders: any = {};
export function getAElf(rpcUrl?: string) {
  const rpc = rpcUrl || '';
  if (!httpProviders[rpc]) {
    httpProviders[rpc] = new AElf(new AElf.providers.HttpProvider(rpc));
  }
  return httpProviders[rpc];
}

export async function getTxResult(
  TransactionId: string,
  chainId: Chain,
  reGetCount = 0,
  retryCountWhenNotExist = 0,
): Promise<any> {
  const rpcUrl = getRpcUrls()[chainId];

  const txResult = await getAElf(rpcUrl).chain.getTxResult(TransactionId);
  console.log('txResult', txResult, rpcUrl);

  if (txResult.error && txResult.errorMessage) {
    throw Error(txResult.errorMessage.message || txResult.errorMessage.Message);
  }

  if (!txResult) {
    throw Error('Failed to retrieve transaction result.');
  }

  if (txResult.Status.toLowerCase() === 'notexisted') {
    if (retryCountWhenNotExist > 5) {
      throw Error({ ...txResult.Error, TransactionId } || 'Transaction error');
    }
    await sleep(1000);
    retryCountWhenNotExist++;
    return getTxResult(TransactionId, chainId, reGetCount, retryCountWhenNotExist);
  }

  if (txResult.Status.toLowerCase() === 'pending') {
    // || txResult.Status.toLowerCase() === 'notexisted'
    if (reGetCount > 10) {
      throw Error(`Timeout. Transaction ID:${TransactionId}`);
    }
    await sleep(1000);
    reGetCount++;
    return getTxResult(TransactionId, chainId, reGetCount, retryCountWhenNotExist);
  }

  if (txResult.Status.toLowerCase() === 'mined') {
    return { TransactionId, txResult };
  }

  throw Error({ ...txResult.Error, TransactionId } || 'Transaction error');
}

export const checkELFApprove = async (options: {
  chainId?: Chain;
  address: string;
  spender: string;
  price: IPrice;
  quantity: number;
}) => {
  const { price, chainId, address, spender, quantity } = options;
  try {
    const res = await GetTotalOfferAmount(
      {
        address,
        priceSymbol: `${price.symbol}`,
      },
      {
        chain: chainId,
      },
    );

    console.log('GetTotalOfferAmountres:', res);

    if (res?.error) {
      message.error(res?.errorMessage?.message || res.error.toString() || DEFAULT_ERROR);
      return false;
    }

    const bigA = new BigNumber(price.amount);

    if (res) {
      const totalAmount = new BigNumber(res?.totalAmount ?? 0);
      const allowanceBN = new BigNumber(res?.allowance ?? 0);

      if (allowanceBN.lt(BigNumber.sum(bigA.multipliedBy(quantity).multipliedBy(10 ** 8), totalAmount))) {
        const amount = Number(BigNumber.sum(totalAmount, bigA.multipliedBy(quantity).multipliedBy(10 ** 8)));
        // await openBatchApprovalEntrance(false);
        return await approve(spender, 'ELF', `${amount}`, chainId);
      }
      return true;
    } else {
      const amount = Number(Number(bigA.multipliedBy(quantity).multipliedBy(10 ** 8)));
      return await approve(spender, 'ELF', `${amount}`, chainId);
    }
  } catch (error) {
    message.destroy();
    const resError = error as unknown as IContractError;
    if (resError) {
      message.error(resError.errorMessage?.message || DEFAULT_ERROR);
    }
    return false;
  }
};

export const approve = async (
  spender: string,
  symbol: string,
  amount: string,
  chainId?: Chain,
  batchApproveNFT?: boolean,
) => {
  try {
    const approveResult = await Approve(
      {
        spender: spender,
        symbol,
        amount,
        batchApproveNFT,
      },
      {
        chain: chainId,
      },
    );

    if (!approveResult || approveResult.error) {
      message.error(approveResult?.errorMessage?.message || DEFAULT_ERROR);
      return false;
    }

    const { TransactionId } = approveResult.result || approveResult;

    if (chainId && TransactionId) {
      await MessageTxToExplore(TransactionId, chainId);
    }

    return true;
  } catch (error) {
    const resError = error as unknown as IContractError;
    if (resError) {
      message.error(resError?.errorMessage?.message || DEFAULT_ERROR);
    }
    return false;
  }
};

export async function MessageTxToExplore(
  txId: string,
  chainId: Chain,
  type: 'success' | 'error' | 'warning' = 'success',
) {
  try {
    const validTxId = (await getTxResult(txId, chainId)).TransactionId;
    messageHTML(validTxId, type, chainId);
  } catch (e: any) {
    if (e.TransactionId) {
      messageHTML(txId, 'error', e.Error || 'Transaction error.', chainId);
    } else {
      messageHTML(txId, 'error', e.message || 'Transaction error.', chainId);
    }
  }
}

export function shortenString(address: string | null, chars = 10): string {
  const parsed = address;
  if (!parsed) {
    return '';
  }
  return `${parsed.substring(0, chars)}...${parsed.substring(parsed.length - chars)}`;
}

// export const openBatchApprovalEntrance = async (batchApproveNFT: boolean) => {
//   try {
//     if (getWalletType() === 'discover') {
//       const discoverProvider = async () => {
//         const provider: IPortkeyProvider | null = await detectDiscoverProvider();
//         if (provider) {
//           if (!provider.isPortkey) {
//             throw new Error('Discover provider found, but check isPortkey failed');
//           }
//           return provider;
//         } else {
//           return null;
//         }
//       };
//       const provider = await discoverProvider();
//       if (!provider) return null;
//       await provider.request({
//         method: MethodsBase.SET_WALLET_CONFIG_OPTIONS,
//         payload: { batchApproveNFT },
//       });
//     }
//   } catch (error) {
//     /* empty */
//   }
// };

const getWalletType = () => {
  const walletInfo = localStorage.getItem('wallet-info');
  const walletInfoObj = walletInfo ? JSON.parse(walletInfo) : {};

  if (!walletInfoObj) {
    return 'null';
  }

  if (walletInfoObj?.discoverInfo) {
    return 'discover';
  } else if (walletInfoObj?.portkeyInfo) {
    return 'portkey';
  } else {
    return 'nightElf';
  }
};

export const checkNFTApprove = async (options: {
  chainId?: Chain;
  address: string;
  spender: string;
  symbol: string;
  amount: number;
}) => {
  const { symbol, amount, chainId, address, spender } = options;
  try {
    const res = await GetTotalEffectiveListedNFTAmount(
      {
        symbol,
        address,
      },
      {
        chain: chainId,
      },
    );

    if (res?.error) {
      message.error(res?.errorMessage?.message || res.error.toString() || DEFAULT_ERROR);
      return false;
    }

    const bigA = new BigNumber(amount);

    console.log('GetTotalEffectiveListedNFTAmount:', res?.allowance);

    if (res) {
      const totalAmount = new BigNumber(res?.totalAmount ?? 0);
      const allowanceBN = new BigNumber(res?.allowance ?? 0);
      if (allowanceBN.lt(BigNumber.sum(bigA, totalAmount))) {
        const amount = Number(BigNumber.sum(totalAmount, bigA));
        return await approve(spender, symbol, `${amount}`, chainId, true);
      }
      return true;
    } else {
      const amount = Number(bigA);
      return await approve(spender, symbol, `${amount}`, chainId, true);
    }
  } catch (error) {
    message.destroy();
    const resError = error as unknown as IContractError;
    if (resError) {
      message.error(resError.errorMessage?.message || DEFAULT_ERROR);
    }
    return false;
  }
};
