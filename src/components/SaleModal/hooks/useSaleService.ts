import { useCallback, useEffect, useMemo, useState } from 'react';
import { IPrice } from './useSetPrice';
import { message } from 'antd';

import { getDurationParamsForListingContractByDuration } from '../utils/getCurListDuration';
import { EditStatusType } from '../utils/checkListValidity.ts';

import { BatchDeListType, IContractError, IListedNFTInfo } from 'contract/type.ts';
import { getForestContractAddress } from 'contract/forest.ts';
import { ListWithFixedPrice as ListWithFixedPriceByContract } from 'contract/market.ts';

import { IDurationData } from './useDuration';

import { fetchNftSalesInfo } from 'api/fetch.ts';
import { useRequest } from 'ahooks';
import { ListingSuccessModal } from '../modal/ListingSuccessModal';
import { EditListingSuccessModal } from '../modal/EditListingSuccessModal';
import { NiceModalHandler, useModal } from '@ebay/nice-modal-react';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import PromptModal, { confirmationAuto, transactionPending } from 'components/PromptModal/index.tsx';
import { Store } from '../../../..';
import { getExploreLink, isERC721, timesDecimals } from 'utils/unit.ts';
import { useGetELFToDollarRate } from 'pages/Collection/hooks/useGetELFRateService.tsx';
import { DEFAULT_ERROR } from 'api/constant.ts';
import { SupportedELFChainId } from 'constants/collection.ts';
import { messageHTML } from 'utils/messageHtml.tsx';
import { formatTokenPrice, formatUSDPrice, handlePlurality } from 'pages/Collection/util.ts';
import getMaxNftQuantityOfSell from 'utils/getMaxNftQuantityOfSell.ts';
import { checkNFTApprove } from 'utils/aelf.ts';
import { useRouter } from 'next/navigation';

export const ListingMessage = {
  title: 'Approve Listing',
  portkey: {
    title: transactionPending,
    message: confirmationAuto,
  },
  default: {
    title: transactionPending,
    message: 'Please confirm the listing in the wallet.',
  },
};

export function getDefaultDataByNftInfoList(infoList?: IListedNFTInfo[], showPrevious?: boolean) {
  if (!infoList?.length) return;
  const infoSortList = infoList
    .slice(0)
    .sort((item1, item2) => new BigNumber(item1.price.amount).comparedTo(new BigNumber(item2.price.amount)));
  const info = infoSortList[0];
  console.log('getDefaultDataByNftInfoList', info);

  return {
    listingPrice: {
      price: BigNumber(info.price.amount)
        .dividedBy(10 ** 8)
        .toNumber(),
      token: {
        symbol: 'ELF',
        tokenId: 'ELF',
        decimals: 8,
      },
    },
    duration: {
      type: 'date',
      value: new Date(
        (Number(info?.duration?.startTime?.seconds || 0) +
          Number(info?.duration?.durationMinutes || 0) * 60 +
          Number(info?.duration.durationHours || 0) * 3600) *
          1000,
      ),
      showPrevious,
    },
    itemsForSell: Number(info.quantity),
  };
}

export function useGetListItemsForSale(nftInfo: INftInfo) {
  const { walletInfo, aelfInfo } = Store.getInstance().getStore();

  const [listedNFTInfoList, setListedNFTInfoList] = useState<IListedNFTInfo[]>([]);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [listItems, setListItems] = useState<number>(0);

  const getMaxNftQuantity = useCallback(async () => {
    if (nftInfo?.nftSymbol && walletInfo.address) {
      const res = await getMaxNftQuantityOfSell(nftInfo?.chainId, nftInfo, walletInfo.address);
      if (!res) {
        return;
      }

      console.log('getMaxNftQuantityOfSell', res);

      setMaxQuantity(!isERC721(nftInfo) ? res.max : 1);
      setListedNFTInfoList(res.listedNFTInfoList);
      setListItems(res.listItems);
    }
  }, [nftInfo?.nftSymbol, walletInfo?.address]);

  useEffect(() => {
    getMaxNftQuantity();
  }, [nftInfo?.nftSymbol, walletInfo?.address]);

  return {
    maxQuantity,
    listItems,
    listedNFTInfoList,
  };
}

function useGetNftSaleInfo(id: string) {
  const { data } = useRequest(() => fetchNftSalesInfo({ id }), { refreshDeps: [id] });
  return {
    nftSaleInfo: data,
  };
}

export function useSaleService(nftInfo: INftInfo, sellModalInstance: NiceModalHandler, mode: string, defaultData: any) {
  const { walletInfo, aelfInfo } = Store.getInstance().getStore();

  const { nftSaleInfo } = useGetNftSaleInfo(nftInfo.id);

  const { listItems, listedNFTInfoList, maxQuantity: availableItemForSell } = useGetListItemsForSale(nftInfo);
  const [listingBtnDisable, setListBtnDisable] = useState<boolean>(false);
  const [listingPrice, setListingPrice] = useState<IPrice>(defaultData?.listingPrice || {});
  const [duration, setDuration] = useState<IDurationData>(defaultData?.duration || {});
  const [itemsForSell, setItemsForSell] = useState<number>(isERC721(nftInfo) ? 1 : 0);
  const { ELFToDollarRate: elfRate } = useGetELFToDollarRate();

  const promptModal = useModal(PromptModal);
  const inValidListPromptModal = useModal(PromptModal);
  const listingSuccessModal = useModal(ListingSuccessModal);
  const editListingSuccessModal = useModal(EditListingSuccessModal);
  // const saleListingModal = useModal(SaleListingModal);
  const navigate = useRouter();

  const isSmallScreen = true;

  const listFail = (error?: IContractError) => {
    if (error) message.error(error.errorMessage?.message || DEFAULT_ERROR);
  };

  const hideAllModal = () => {
    promptModal.hide();
    inValidListPromptModal.hide();
    listingSuccessModal.hide();
    editListingSuccessModal.hide();
    // saleListingModal.hide();
    sellModalInstance.hide();

    navigate.push(`/detail?symbol=${nftInfo?.nftSymbol}&from=all&source=telegram`);
  };

  const listWithFixedPrice = async (amount: number, status?: EditStatusType) => {
    console.log('listWithFixedPrice', amount);
    try {
      const spender =
        nftInfo?.chainId === SupportedELFChainId.MAIN_NET
          ? getForestContractAddress().main
          : getForestContractAddress().side;
      const approveRes = await checkNFTApprove({
        symbol: nftInfo.nftSymbol,
        address: walletInfo?.address,
        spender,
        amount: timesDecimals(amount, nftInfo?.decimals || '0').toNumber(),
        chainId: nftInfo.chainId,
      });

      if (!approveRes) {
        listFail();
        return Promise.reject(DEFAULT_ERROR);
      }

      const durationList = getDurationParamsForListingContractByDuration(duration);

      const result = await ListWithFixedPriceByContract(
        {
          symbol: nftInfo.nftSymbol,
          price: {
            symbol: listingPrice?.token?.symbol || '',
            amount: Number(timesDecimals(listingPrice?.price, listingPrice?.token?.decimals)),
          },
          quantity: timesDecimals(amount, nftInfo?.decimals || '0').toNumber(),
          duration: durationList,
          whitelists: null,
          isWhitelistAvailable: false,
        },
        {
          chain: nftInfo.chainId,
        },
      );
      if (result?.error || !result) {
        listFail(result || DEFAULT_ERROR);
        return Promise.reject(result || DEFAULT_ERROR);
      }

      const { TransactionId = '' } = result.result || result;
      messageHTML(TransactionId || '', 'success', nftInfo.chainId);
      const explorerUrl = getExploreLink(TransactionId, 'transaction', nftInfo.chainId);
      promptModal.hide();

      listingSuccessModal.show({ nftInfo, explorerUrl, onViewMyListing: hideAllModal });

      // if (mode === 'edit') {
      //   editListingSuccessModal.show({
      //     nftInfo,
      //     explorerUrl,
      //     onViewMyListing: hideAllModal,
      //     status,
      //   });
      // } else {
      //   listingSuccessModal.show({ nftInfo, explorerUrl, onViewMyListing: hideAllModal });
      // }
    } catch (error) {
      const resError = error as IContractError;
      message.error(resError.errorMessage?.message || DEFAULT_ERROR);
      return Promise.reject(error);
    }
  };

  // const onCancelAllListings = async () => {
  //   const mainAddress = await getAccountInfoSync();
  //   if (!mainAddress) {
  //     return;
  //   }

  //   sellModalInstance.hide();
  //   promptModal.show({
  //     nftInfo: {
  //       image: nftSaleInfo?.logoImage,
  //       collectionName: nftSaleInfo?.collectionName,
  //       nftName: nftInfo?.tokenName,
  //       priceTitle: handlePlurality(listedNFTInfoList.length, 'Listing'),
  //     },
  //     title: CancelListingMessage.title,
  //     content: {
  //       title: walletInfo.portkeyInfo ? CancelListingMessage.portkey.title : CancelListingMessage.default.title,
  //       content: walletInfo.portkeyInfo ? CancelListingMessage.portkey.message : CancelListingMessage.default.message,
  //     },
  //     initialization: async () => {
  //       await batchDeList(
  //         {
  //           symbol: nftInfo.nftSymbol,
  //           price: {
  //             symbol: 'ELF',
  //             amount: 1,
  //           },
  //           batchDelistType: BatchDeListType.GREATER_THAN,
  //         },
  //         nftInfo.chainId,
  //       );
  //       promptModal.hide();
  //     },
  //     onClose: () => {
  //       promptModal.hide();
  //     },
  //   });
  // };

  const onReEditListing = () => {
    promptModal.hide();
    sellModalInstance.show({
      nftInfo,
      type: 'add',
      defaultData: {
        listingPrice,
        duration,
        itemsForSell,
      },
    });
  };

  const showListingPromptModal = (props: { amount: number; extendStatus?: EditStatusType }) => {
    const { amount, extendStatus } = props;
    console.log('showListingPromptModal', amount);
    promptModal.show({
      nftInfo: {
        image: nftSaleInfo?.logoImage,
        collectionName: nftSaleInfo?.collectionName,
        nftName: nftInfo?.tokenName,
        priceTitle: nftInfo && isERC721(nftInfo) ? 'Listing Price' : 'Listing Price Per Item',
        price: `${listingPrice.price ? formatTokenPrice(listingPrice.price) : '--'} ELF`,
        usdPrice: listingUSDPrice ? formatUSDPrice(listingUSDPrice) : '$ --',
        item: nftInfo && isERC721(nftInfo) ? undefined : handlePlurality(itemsForSell, 'item'),
      },
      title: ListingMessage.title,
      content: {
        title: walletInfo.portkeyInfo ? ListingMessage.portkey.title : ListingMessage.default.title,
        content: walletInfo.portkeyInfo ? ListingMessage.portkey.message : ListingMessage.default.message,
      },
      buttonConfig: [
        {
          btnText: 'Try Again',
          onConfirm: async () => await listWithFixedPrice(amount, extendStatus),
        },
        {
          btnText: 'Edit Listing',
          onConfirm: onReEditListing,
        },
      ],
      initialization: async () => await listWithFixedPrice(amount, extendStatus),
      onClose: () => {
        promptModal.hide();
      },
    });
  };

  // const delNotValidListingAndContinueListing = async (status: BatchDeListType, amount: number) => {
  //   let res;
  //   try {
  //     res = await batchDeList(
  //       {
  //         symbol: nftInfo.nftSymbol,
  //         price: {
  //           symbol: listingPrice?.token?.symbol || '',
  //           amount: Number(timesDecimals(listingPrice?.price, listingPrice?.token?.decimals)),
  //         },
  //         batchDelistType: status,
  //       },
  //       nftInfo.chainId,
  //     );
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  //   if (!res) {
  //     return Promise.reject(DEFAULT_ERROR);
  //   }
  //   inValidListPromptModal.hide();
  //   showListingPromptModal({
  //     amount,
  //   });
  // };
  // const onEditListingForERC721 = async () => {
  //   if (!checkInputDataBeforeSubmit()) return;

  //   const mainAddress = await getAccountInfoSync();
  //   if (!mainAddress) {
  //     return;
  //   }

  //   sellModalInstance.hide();
  //   const amount = 1;
  //   const durationList = getDurationParamsForListingContractByDuration(duration);
  //   const { status, invalidList, extendStatus } = await checkListValidity(
  //     `${listingPrice?.price}`,
  //     listedNFTInfoList,
  //     durationList,
  //   );

  //   console.log('checkListValidity', status);
  //   if (status === BatchDeListType.GREATER_THAN) {
  //     showListingPromptModal({
  //       amount,
  //       extendStatus,
  //     });
  //   } else {
  //     inValidListPromptModal.show({
  //       nftInfo: {
  //         image: nftInfo?.previewImage || '',
  //         collectionName: nftInfo.nftCollection?.tokenName,
  //         nftName: nftInfo?.tokenName,
  //         priceTitle: handlePlurality(invalidList.length, 'Listing'),
  //       },
  //       title: CancelListingMessage.title,
  //       content: {
  //         title: walletInfo.portkeyInfo ? CancelListingMessage.portkey.title : CancelListingMessage.default.title,
  //         content: walletInfo.portkeyInfo
  //           ? inValidListErrorMessage.portkey[status]
  //           : inValidListErrorMessage.default[status],
  //       },
  //       initialization: () => delNotValidListingAndContinueListing(status, 1),
  //       onClose: () => {
  //         promptModal.hide();
  //       },
  //     });
  //   }
  // };

  // const onEditListingForERC1155 = () => {
  //   sellModalInstance.hide();
  //   saleListingModal.show(nftInfo);
  // };

  const checkInputDataBeforeSubmit = () => {
    if (Number(itemsForSell) > Number(availableItemForSell)) {
      message.error('Your balance of NFT is not enough');
      return false;
    }
    if (duration?.type === 'date') {
      const timeDifference = moment(duration.value).diff(moment());
      console.log('duration test', duration.value);
      const minutesDifference = moment.duration(timeDifference).asMinutes();
      const months = Math.floor(moment.duration(timeDifference).asMonths());
      if (minutesDifference < 15) {
        message.error('The listing duration should be at least 15 minutes.');
        return false;
      }
      if (months > 6) {
        message.error('The listing duration should be no more than 6 months.');
        return false;
      }
    }
    return true;
  };

  const onCompleteListingHandler = async () => {
    if (!walletInfo.address || !nftInfo.nftSymbol || !checkInputDataBeforeSubmit()) return;

    sellModalInstance.hide();

    if (isERC721(nftInfo)) {
      const amount = 1;
      if (mode === 'add') {
        showListingPromptModal({
          amount,
        });
      }
    }

    if (!isERC721(nftInfo)) {
      const amount = itemsForSell;
      showListingPromptModal({
        amount,
      });
    }
  };

  // useEffect(() => {
  //   if (!Number(listingPrice.price) || !duration?.value || !Number(itemsForSell)) {
  //     setListBtnDisable(true);
  //     return;
  //   }
  //   setListBtnDisable(false);
  // }, [duration, listingPrice, itemsForSell]);

  const listingUSDPrice = useMemo(() => {
    if (!listingPrice?.price || !elfRate) return;
    return elfRate * Number(listingPrice.price);
  }, [elfRate, listingPrice]);

  return {
    nftSaleInfo,
    listingBtnDisable,
    listingPrice,
    setListingPrice,
    listItems,
    setDuration,
    onCompleteListingHandler,
    listingUSDPrice,
    itemsForSell,
    setItemsForSell,
    // onCancelAllListings,
    // onEditListingForERC721,
    // onEditListingForERC1155,
    availableItemForSell,
  };
}
