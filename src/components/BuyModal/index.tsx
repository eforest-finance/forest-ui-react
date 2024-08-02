import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Base/Modal';
import Button from '../Base/Button';
import PromptModal, { confirmationAuto, transactionPending } from '../PromptModal';
import ResultModal from '../ResultModal';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import PriceInfo, { PriceTypeEnum } from './PriceInfo';
import InputQuantity from './InputQuantity';
import Summary from './Summary';
import TotalPrice from './TotalPrice';
import Balance from './Balance';
import styles from './index.module.css';
import BigNumber from 'bignumber.js';
import { formatTokenPrice, formatUSDPrice, handlePlurality } from 'pages/Collection/util.ts';
import { divDecimals, formatInputNumber, getExploreLink, isERC721, timesDecimals } from 'utils/unit.ts';
import useGetNftNumber from 'provider/hooks/useGetNftNumber.ts';
import { useGetSalesInfo } from 'provider/hooks/useGetSalesInfo.tsx';
import moment from 'moment';
import { getNFTNumber } from 'utils/getNftNumber.ts';
import getListings from 'utils/getListing.ts';
import { Store, useForestStore } from '../../..';
import initializeProto from 'utils/initializeProto.ts';
import useBatchBuyNow from 'provider/hooks/useBuyNow.tsx';
import { useRouter } from 'next/navigation';

export const BuyMessage = {
  title: 'Approve Purchase',
  portkey: {
    title: transactionPending,
    message: confirmationAuto,
  },
  default: {
    title: transactionPending,
    message: 'Please confirm the purchase in the wallet.',
  },
  errorMessage: {
    title: 'Purchase Failed',
    tips: 'Purchase of all items failed',
    description:
      'Purchase failure could be due to network issues, transaction fee increases, or someone else acquiring the item before you.',
  },
};

function BuyNowModal(options: {
  nftInfo: any;
  elfRate: number;
  onViewNft?: () => void;
  onClose?: () => void;
  buyItem?: FormatListingType;
}) {
  const modal = useModal();
  const { onClose, elfRate, buyItem, nftInfo, onViewNft } = options;

  const { getNftNumber, nftNumber } = useGetNftNumber({
    nftSymbol: nftInfo.nftSymbol,
    chainId: nftInfo.chainId,
  });

  console.log('nftNumber:=====>', nftNumber);

  const navigate = useRouter();

  const { aelfInfo } = Store.getInstance().getStore();

  const { tokenBalance, nftTotalSupply } = nftNumber;

  const [{ isLogin = true }, { dispatch }] = useForestStore();

  const promptModal = useModal(PromptModal);
  const resultModal = useModal(ResultModal);
  const title = 'Buy Now';
  const submitBtnText = 'Buy Now';
  const walletInfo = Store.getInstance().getValue('walletInfo');

  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [listings, setListings] = useState<FormatListingType[]>([]);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [, setTotalCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [buyListings, setBuyListings] = useState<IFixPriceList[]>([]);
  const batchBuyNow = useBatchBuyNow(nftInfo, nftInfo?.chainId);
  //   const { walletType } = useWebLogin();
  //   const isPortkeyConnected = walletType === WalletType.portkey;

  const [quantityErrorTip, setQuantityErrorTip] = useState('');

  const saleInfo = useGetSalesInfo(nftInfo?.id || '');

  //   const mainChainNftBalance = useGetMainChainBalance({ tokenName: 'ELF' });
  //   const transferModal = useModal(CrossChainTransferModal);

  const convertTotalPrice = useMemo(() => {
    const totalPriceBig = new BigNumber(totalPrice);
    const convert = totalPriceBig.multipliedBy(elfRate).toNumber();
    return convert;
  }, [elfRate, totalPrice]);
  const [quantity, setQuantity] = useState<number>(0);

  const averagePrice = useMemo(() => {
    const totalPriceBig = new BigNumber(totalPrice);
    const average = quantity ? totalPriceBig.div(quantity).toNumber() : 0;
    return average;
  }, [totalPrice, quantity]);

  const convertAveragePrice = useMemo(() => {
    const averagePriceBig = new BigNumber(averagePrice);
    const convertAverage = averagePriceBig.multipliedBy(elfRate).toNumber();
    return convertAverage;
  }, [averagePrice, elfRate]);

  useEffect(() => {
    initializeProto(aelfInfo?.marketSideAddress);
  }, [aelfInfo?.marketSideAddress]);

  useEffect(() => {
    if (buyItem) {
      if (quantity > buyItem.quantity) {
        setTotalPrice(0);
        return;
      }
      setTotalPrice(quantity * buyItem.price);
    }
  }, [buyItem, quantity]);

  const buyNow = async () => {
    try {
      let buyListingData: IFixPriceList[] = [];

      if (buyItem) {
        const buyListing: IFixPriceList = {
          offerTo: buyItem.ownerAddress,
          quantity: timesDecimals(quantity, nftInfo?.decimals || '0').toNumber(),
          price: {
            symbol: buyItem.purchaseToken.symbol,
            amount: buyItem.price,
          },
          startTime: {
            seconds: moment.unix(Math.floor(buyItem.startTime / 1000)).unix(),
            nanos: 0,
          },
        };
        buyListingData = [buyListing];
      } else {
        buyListingData = buyListings;
      }

      const batchBuyNowRes = await batchBuyNow({
        symbol: nftInfo?.nftSymbol || '',
        fixPriceList: buyListingData.map((list) => {
          return {
            ...list,
            price: {
              ...list.price,
              amount: Number(timesDecimals(list.price.amount, 8)),
            },
          };
        }),
        price: {
          symbol: 'ELF',
          amount: new BigNumber(timesDecimals(averagePrice, '0')).toNumber(), // elf price no need decimals
        },
        quantity,
        nftDecimals: Number(nftInfo?.decimals || 0),
      });

      console.log('batchBuyNowRes', batchBuyNowRes);

      if (batchBuyNowRes && batchBuyNowRes !== 'failed') {
        const explorerUrl = getExploreLink(batchBuyNowRes.TransactionId, 'transaction', nftInfo?.chainId);
        if (batchBuyNowRes.allSuccessFlag) {
          resultModal.show({
            previewImage: nftInfo?.previewImage || '',
            title: 'NFT Successfully Purchased!',
            description: `You are now the owner of ${nftInfo?.tokenName} NFT in the ${nftInfo?.nftCollection?.tokenName} Collection.`,
            buttonInfo: {
              btnText: 'View NFT',
              onConfirm: () => {
                // navigate.push(`/detail?symbol=${nftInfo?.nftSymbol}&from=all&source=telegram`);
                onViewNft && onViewNft();
                resultModal.hide();
              },
            },
            info: {
              logoImage: nftInfo?.nftCollection?.logoImage || '',
              subTitle: nftInfo?.nftCollection?.tokenName,
              title: nftInfo?.tokenName,
              extra: nftInfo && isERC721(nftInfo) ? undefined : handlePlurality(quantity, 'item'),
            },
            jumpInfo: {
              url: explorerUrl,
            },
          });
        } else {
          const list = batchBuyNowRes.failPriceList?.value.map((item) => {
            const price = divDecimals(item.price.amount, 8);
            const convertPrice = new BigNumber(price).multipliedBy(elfRate);

            return {
              image: nftInfo?.previewImage || '',
              collectionName: nftInfo?.nftCollection?.tokenName,
              nftName: nftInfo?.tokenName,
              item: handlePlurality(Number(item.quantity), 'item'),
              priceTitle: 'Each item price',
              price: `${formatTokenPrice(price)} ${item.price.symbol || 'ELF'}`,
              usdPrice: formatUSDPrice(convertPrice),
            };
          });
          let errorCount = 0;
          batchBuyNowRes.failPriceList?.value.forEach((item) => {
            errorCount += Number(item.quantity);
          });
          resultModal.show({
            previewImage: nftInfo?.previewImage || '',
            title: 'Purchase Partially Completed',
            buttonInfo: {
              btnText: 'View NFT',
              onConfirm: () => {
                resultModal.hide();
              },
            },
            info: {
              logoImage: nftInfo?.nftCollection?.logoImage || '',
              subTitle: nftInfo?.nftCollection?.tokenName,
              title: nftInfo?.tokenName,
              extra: nftInfo && isERC721(nftInfo) ? undefined : handlePlurality(Number(quantity) - errorCount, 'item'),
            },
            jumpInfo: {
              url: explorerUrl,
            },
            error: {
              title: `Purchase of ${handlePlurality(errorCount, 'item')}  failed`,
              description: `Purchase failure could be due to network issues, transaction fee increases, or someone else acquiring the item before you.`,
              list,
            },
          });
        }
      }

      promptModal.hide();
      setLoading(false);
      onCloseModal();
    } catch (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  };

  const onConfirm = async () => {
    if (isLogin) {
      setLoading(true);
      // const mainAddress = await getAccountInfoSync();
      // if (!mainAddress) {
      //   setLoading(false);
      //   return;
      // }
      // modal.hide();

      promptModal.show({
        nftInfo: {
          image: '' || nftInfo?.previewImage || '',
          collectionName: '' || nftInfo?.nftCollection?.tokenName,
          nftName: '' || nftInfo?.tokenName,
          priceTitle: 'Total Price',
          price: '' || `${formatTokenPrice(totalPrice)} ELF`,
          usdPrice: '' || formatUSDPrice(convertTotalPrice),
          item: nftInfo && isERC721(nftInfo) ? undefined : handlePlurality(quantity, 'item'),
        },
        title: BuyMessage.title,
        content: {
          title: '' || walletInfo.portkeyInfo ? BuyMessage.portkey.title : BuyMessage.default.title,
          content: '' || walletInfo.portkeyInfo ? BuyMessage.portkey.message : BuyMessage.default.message,
        },
        initialization: buyNow,
        onClose: () => {
          promptModal.hide();
        },
      });
    } else {
      console.error('please login');
    }
  };

  useEffect(() => {
    if (buyItem && buyItem.quantity == 1) {
      setTotalPrice(buyItem.price);
    }
  }, [buyItem]);

  const calculatePrice = () => {
    if (!listings.length) {
      return;
    }
    setBuyListings([]);
    setTotalPrice(0);
    let totalPrice = 0;
    let curQuantity = 0;
    const buyListings: IFixPriceList[] = [];
    for (let i = 0; i < listings.length; i++) {
      const list = listings[i];
      if (list.quantity <= quantity - curQuantity) {
        const buyListing: IFixPriceList = {
          offerTo: list.ownerAddress,
          quantity: timesDecimals(list.quantity, nftInfo?.decimals || '0').toNumber(),
          price: {
            symbol: list.purchaseToken.symbol,
            amount: list.price,
          },
          startTime: {
            seconds: moment.unix(Math.floor(list.startTime / 1000)).unix(),
            nanos: 0,
          },
        };
        buyListings.push(buyListing);
        totalPrice += list.price * list.quantity;
        if (list.quantity === quantity - curQuantity) {
          break;
        }
        curQuantity += list.quantity;
      } else {
        const buyListing: IFixPriceList = {
          offerTo: list.ownerAddress,
          quantity: timesDecimals(quantity - curQuantity, nftInfo?.decimals || '0').toNumber(),
          price: {
            symbol: list.purchaseToken.symbol,
            amount: list.price,
          },
          startTime: {
            seconds: moment.unix(Math.floor(list.startTime / 1000)).unix(),
            nanos: 0,
          },
        };
        buyListings.push(buyListing);
        totalPrice += list.price * (quantity - curQuantity);
        break;
      }
    }
    setBuyListings(buyListings);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    if (modal.visible) {
      setQuantity(1);
    }
  }, [modal.visible]);

  useEffect(() => {
    if (buyItem) return;
    if (maxQuantity < quantity && listings.length && quantity <= (saleInfo?.availableQuantity || 0)) {
      setPage((page) => {
        return ++page;
      });
    } else {
      if (quantity <= (saleInfo?.availableQuantity || 0)) {
        calculatePrice();
      }
    }
  }, [buyItem, listings, maxQuantity, quantity, saleInfo]);

  const getListingsData = async (page: number) => {
    if (quantity > (saleInfo?.availableQuantity || 0)) {
      return;
    }
    try {
      if (!nftInfo) return;
      setLoading(true);

      const res = await getListings({
        page,
        chainId: nftInfo.chainId,
        symbol: nftInfo.nftSymbol,
        excludedAddress: walletInfo.address,
      });
      if (!res) return;
      setTotalCount(res.totalCount);
      const curMax = res.list.reduce((pre, val) => {
        return pre + val.quantity;
      }, 0);

      setListings([...listings, ...res.list]);
      setMaxQuantity((maxQuantity) => {
        return maxQuantity + curMax;
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modal.visible) {
      getListingsData(page);
      // getNFTNumber({
      //   owner: walletInfo.address,
      //   nftSymbol: nftInfo?.nftSymbol,
      //   chainId: infoState.sideChain,
      // });
    }
  }, [page, modal.visible]);

  const isSideChainBalanceInsufficient = useMemo(() => {
    return BigNumber(divDecimals(Number(tokenBalance), 8)).lt(BigNumber(totalPrice));
  }, [tokenBalance, totalPrice]);

  //   const isAllChainsBalanceInsufficient = useMemo(() => {
  //     return BigNumber(divDecimals(Number(mainChainNftBalance), 8))
  //       .plus(BigNumber(divDecimals(Number(tokenBalance), 8)))
  //       .lt(BigNumber(totalPrice));
  //   }, [mainChainNftBalance, tokenBalance, totalPrice]);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || BigNumber(e.target.value).isZero()) {
      setQuantity(0);
      return;
    }
    const inputNumber = Number(formatInputNumber(e.target.value, 11));
    if (BigNumber(inputNumber).gt(buyItem?.quantity || saleInfo?.availableQuantity || 0)) {
      setQuantityErrorTip(
        'Maximum quantity exceeded. Please ensure your purchase does not exceed the available quantity.',
      );
      setTotalPrice(0);
    } else {
      setQuantityErrorTip('');
    }
    setQuantity(inputNumber);
  };

  //   const handleTransferShow = () => {
  //     modal.hide();
  //     transferModal.show({
  //       type: CrossChainTransferType.token,
  //       onClose: () => {
  //         transferModal.hide();
  //         modal.show();
  //       },
  //     });
  //   };

  //   const insufficientTip = useMemo(() => {
  //     if (isSideChainBalanceInsufficient) {
  //       if (isAllChainsBalanceInsufficient) {
  //         return (
  //           <div className="text-[12px] leading-[20px] font-normal text-functionalDanger">Insufficient balance.</div>
  //         );
  //       } else {
  //         return (
  //           <div className="text-[12px] leading-[20px] font-normal  text-functionalDanger">
  //             <span className={isPortkeyConnected ? '!text-[var(--text-primary)]' : ''}>Insufficient balance.</span>
  //             <>
  //               <span className={isPortkeyConnected ? '!text-[var(--text-primary)]' : ''}>You can</span>{' '}
  //               {isPortkeyConnected ? (
  //                 <span className="cursor-pointer !text-[var(--functional-link)]" onClick={handleTransferShow}>
  //                   {CrossChainTransferMsg}
  //                 </span>
  //               ) : (
  //                 CrossChainTransferMsg
  //               )}
  //             </>
  //           </div>
  //         );
  //       }
  //     }
  //     return null;
  //   }, [isAllChainsBalanceInsufficient, isPortkeyConnected, isSideChainBalanceInsufficient]);

  const showQuantity = useMemo(() => {
    if (buyItem) {
      return BigNumber(buyItem.quantity).gt(1);
    }
    return BigNumber(nftTotalSupply).gt(1);
  }, [buyItem, nftTotalSupply]);

  const priceInfoType = useMemo(() => {
    return (buyItem ? buyItem.quantity > 1 : Number(nftTotalSupply) > 1) ? PriceTypeEnum.BUY : PriceTypeEnum.BUY721;
  }, [buyItem, nftTotalSupply]);

  const onCloseModal = () => {
    if (onClose) {
      onClose();
    } else {
      modal.hide();
    }
  };

  return (
    <Modal
      className={styles['buy-modal-custom']}
      destroyOnClose
      afterClose={modal.remove}
      footer={
        <Button
          disabled={
            isSideChainBalanceInsufficient || !!quantityErrorTip || !quantity || (!buyListings.length && !buyItem)
          }
          loading={loading}
          type="primary"
          size="ultra"
          className="!w-[256px]"
          onClick={onConfirm}>
          {submitBtnText}
        </Button>
      }
      onCancel={onCloseModal}
      title={title}
      open={modal.visible}>
      <PriceInfo
        nftInfo={nftInfo}
        quantity={quantity}
        price={averagePrice}
        convertPrice={convertAveragePrice}
        type={priceInfoType}
      />
      {(showQuantity || true) && (
        <div className="mt-[24px] mdTW:mt-[32px]">
          <InputQuantity
            availableMount={buyItem ? buyItem?.quantity : saleInfo?.availableQuantity || 0}
            value={quantity === 0 ? '' : formatTokenPrice(quantity)}
            onChange={handleQuantityChange}
            errorTip={quantityErrorTip}
          />
        </div>
      )}
      <div className="mt-[52px] mdTW:mt-[60px]">
        <Summary />
      </div>
      <div className="mt-[24px] mdTW:mt-[32px]">
        <TotalPrice totalPrice={totalPrice} convertTotalPrice={convertTotalPrice} />
      </div>
      <div className="mt-[24px] mdTW:mt-[32px]">
        <Balance amount={divDecimals(Number(tokenBalance), 8).toNumber()} suffix="ELF" />
      </div>
      {/* <div className="mt-[8px]">{insufficientTip}</div> */}
    </Modal>
  );
}

export default memo(NiceModal.create(BuyNowModal));
