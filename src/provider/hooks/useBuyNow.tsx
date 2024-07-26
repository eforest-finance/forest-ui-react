import { message } from 'antd';
import { DEFAULT_ERROR, checkELFApprove } from 'utils/aelf.ts';
// import { BatchBuyNow } from 'contract/market.ts';
import { IBatchBuyNowParams, IContractError, IPrice, ISendResult, ITransactionResult } from 'contract/type.ts';
import ResultModal from 'components/ResultModal/index.tsx';
import { useModal } from '@ebay/nice-modal-react';
import { BuyMessage } from 'components/BuyModal/index.tsx';
import { isERC721, timesDecimals } from 'utils/unit.ts';
import { handlePlurality } from 'pages/Collection/util.ts';
import { deserializeLog } from 'utils/log.ts';
import { SupportedELFChainId } from 'constants/collection.ts';
import { getForestContractAddress } from 'contract/forest.ts';
import { Proto } from 'utils/proto.ts';
import { Store } from '../../..';
import { BatchBuyNow } from 'contract/market.ts';
// import { getForestContractAddress } from 'contract/forest';
// import { SupportedELFChainId } from 'constants/chain';
// import { DEFAULT_ERROR } from 'constants/errorMessage';
// import { useCheckLoginAndToken } from 'hooks/useWalletSync';
// import { Proto } from 'utils/proto';
// import { deserializeLog } from 'utils/deserializeLog';
// import { SentryMessageType, captureMessage } from 'utils/captureMessage';
// import { UserDeniedMessage } from 'contract/formatErrorMsg';
// import ResultModal from 'components/ResultModal';
// import { useModal } from '@ebay/nice-modal-react';
// import useDetailGetState from 'store/state/detailGetState';
// import { BuyMessage } from 'constants/promptMessage';
// import { isERC721 } from 'utils/isTokenIdReuse';
// import { handlePlurality } from 'utils/handlePlurality';
// import { timesDecimals } from 'utils/calculate';

export const UserDeniedMessage = 'Request rejected. Forest needs your permission to continue';

function useBatchBuy(nftInfo: any, chainId?: Chain) {
  const resultModal = useModal(ResultModal);
  const { walletInfo, aelfInfo } = Store.getInstance().getStore();

  const showErrorModal = ({ quantity }: { quantity: number }) => {
    resultModal.show({
      previewImage: nftInfo?.previewImage || '',
      title: BuyMessage.errorMessage.title,
      hideButton: true,
      info: {
        logoImage: nftInfo?.nftCollection?.logoImage || '',
        subTitle: nftInfo?.nftCollection?.tokenName,
        title: nftInfo?.tokenName,
        extra: nftInfo && isERC721(nftInfo) ? undefined : handlePlurality(quantity, 'item'),
      },
      error: {
        title: BuyMessage.errorMessage.tips,
        description: BuyMessage.errorMessage.description,
      },
    });
  };

  const getResult = async (contractAddress: string, TransactionResult: ITransactionResult, TransactionId: string) => {
    const proto = Proto.getInstance().getProto();
    const currentProto = proto[contractAddress];
    if (currentProto) {
      const log = TransactionResult?.Logs?.filter((item) => {
        return item.Name === 'BatchBuyNowResult';
      })?.[0];
      if (log) {
        try {
          const logResult: IBatchBuyNowResult = await deserializeLog(log, currentProto);
          return logResult;
        } catch (error) {
          console.error(error);

          return false;
        }
      } else {
        console.error('no log events');
        return false;
      }
    } else {
      console.error('no proto');

      return false;
    }
  };

  const batchBuyNow = async (
    parameter: IBatchBuyNowParams & {
      price: IPrice;
      quantity: number;
      nftDecimals: number;
    },
  ) => {
    const approveTokenResult = await checkELFApprove({
      chainId: chainId,
      price: parameter.price,
      quantity: timesDecimals(parameter.quantity, '0').toNumber(),
      spender:
        chainId === SupportedELFChainId.MAIN_NET ? getForestContractAddress().main : getForestContractAddress().side,
      address: walletInfo.address || '',
    });

    console.log('approveTokenResult：', approveTokenResult);

    if (!approveTokenResult) {
      return 'failed';
    }

    try {
      const result = await BatchBuyNow({
        symbol: parameter.symbol,
        fixPriceList: parameter.fixPriceList,
      });
      if (result) {
        const { TransactionId, TransactionResult } = (result.result || result) as ISendResult;
        if (TransactionResult) {
          const res = await getResult(aelfInfo?.marketSideAddress, TransactionResult, TransactionId);
          if (res) {
            return {
              ...res,
              TransactionId,
            };
          } else {
            message.error(DEFAULT_ERROR);
            return 'failed';
          }
        }
      } else {
        message.error(DEFAULT_ERROR);
        return 'failed';
      }
    } catch (error) {
      console.log('error:', error);

      message.destroy();
      const resError = error as unknown as IContractError;
      if (resError.errorMessage?.message.includes(UserDeniedMessage)) {
        message.error(resError?.errorMessage?.message || DEFAULT_ERROR);
        return Promise.reject(error);
      }
      showErrorModal({ quantity: 0 });
      return 'failed';
    }
  };
  return batchBuyNow;
}

export default useBatchBuy;
