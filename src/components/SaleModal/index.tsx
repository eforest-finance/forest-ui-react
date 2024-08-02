import { SummaryInfo } from './comps/SummaryInfo';
import { SetPrice } from './comps/SetPrice';
import { Duration } from './comps/Duration';
import { useSaleService } from './hooks/useSaleService';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import styles from './index.module.css';
import Button from 'components/Base/Button/index.tsx';
import Modal from 'components/Base/Modal/index.tsx';
import { formatTokenPrice, formatUSDPrice, handlePlurality } from 'pages/Collection/util.ts';
import NftInfoListCard from 'components/PromptModal/NftInfoListCard/index.tsx';
import { useNiceModalCommonService } from './hooks/useNiceModalCommonService';
import { SetSellItemNumber } from './comps/SetSellItemNumber';

interface ISaleModalProps {
  nftInfo: INftInfo;
  type: 'add' | 'edit';
  defaultData: {
    [key: string]: any;
  };
  onViewNft?: () => void;
}

export function SaleModalERC721Constructor({ nftInfo, type = 'add', defaultData }: ISaleModalProps) {
  const isSmallScreen = true;
  const modal = useModal();
  useNiceModalCommonService(modal);
  const {
    nftSaleInfo,
    onCompleteListingHandler,
    listingBtnDisable,
    listingPrice,
    listingUSDPrice,
    setListingPrice,
    setDuration,
    itemsForSell,
    // onCancelAllListings,
    // onEditListingForERC721,
  } = useSaleService(nftInfo, modal, type, defaultData);

  const footer = (
    <Button
      type="primary"
      size="ultra"
      className="w-[256px]"
      disabled={listingBtnDisable}
      onClick={onCompleteListingHandler}>
      Complete Listing
    </Button>
  );

  // const footer =
  //   type === 'add' ? (
  //     <Button
  //       type="primary"
  //       size="ultra"
  //       className="w-[256px]"
  //       disabled={listingBtnDisable}
  //       onClick={onCompleteListingHandler}>
  //       Complete Listing
  //     </Button>
  //   ) : (
  //     <div className="flex w-full -mx-2 justify-center">
  //       <Button
  //         size="ultra"
  //         className={`${!isSmallScreen ? 'min-w-[188px] mx-2' : 'flex-1 !px-0 mx-2'}`}
  //         onClick={onCancelAllListings}>
  //         Cancel all Listing
  //       </Button>
  //       <Button
  //         type="primary"
  //         size="ultra"
  //         className={`${!isSmallScreen ? 'w-[188px] mx-2' : 'flex-1 !px-0 mx-2'}`}
  //         disabled={listingBtnDisable}
  //         onClick={onEditListingForERC721}>
  //         Edit Listing
  //       </Button>
  //     </div>
  //   );

  const setPriceTitle = type === 'edit' ? 'Set a New Price' : 'Set a Price';
  const tooltip =
    type === 'edit'
      ? 'If you want to raise the listing price, you need to first cancel any existing listings at a lower price. Listing cancellation will cost transaction fees.'
      : '';
  const tooltipForDuration =
    type === 'edit'
      ? 'If you want to reduce the listing duration, you need to first cancel any existing listings with a longer duration. Listing cancellation will cost transaction fees.'
      : '';
  return (
    <Modal
      open={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
      destroyOnClose={true}
      title={`${type === 'add' ? 'List for Sale' : 'Edit Listing'}`}
      footer={footer}
      className={styles['sale-modal-custom']}>
      <NftInfoListCard
        image={nftSaleInfo?.logoImage || ''}
        collectionName={nftSaleInfo?.collectionName}
        nftName={nftSaleInfo?.tokenName}
        item={handlePlurality(itemsForSell, 'item')}
        priceTitle={'Listing Price'}
        price={`${listingPrice?.price ? formatTokenPrice(listingPrice?.price) : '--'} ELF`}
        usdPrice={listingUSDPrice ? formatUSDPrice(listingUSDPrice) : '$ --'}
      />
      <SetPrice
        floorPrice={nftSaleInfo?.floorPrice}
        lastSalePrice={nftSaleInfo?.lastDealPrice}
        onChange={setListingPrice}
        title={setPriceTitle}
        tooltip={tooltip}
        defaultPrice={listingPrice?.price}
      />
      <Duration onChange={setDuration} defaultExpirationData={defaultData?.duration} tooltip={tooltipForDuration} />
      <SummaryInfo listingPrice={listingPrice?.price} />
    </Modal>
  );
}

export function SaleModalERC1155Constructor({ nftInfo, type = 'edit', defaultData, onViewNft }: ISaleModalProps) {
  const modal = useModal();
  useNiceModalCommonService(modal);
  const {
    nftSaleInfo,
    onCompleteListingHandler,
    listingBtnDisable,
    listingPrice,
    listingUSDPrice,
    setListingPrice,
    setDuration,
    itemsForSell,
    setItemsForSell,
    availableItemForSell,
  } = useSaleService(nftInfo, modal, type, defaultData, onViewNft);

  const footer = (
    <Button
      type="primary"
      size="ultra"
      className="w-[256px]"
      disabled={listingBtnDisable}
      onClick={onCompleteListingHandler}>
      Complete Listing
    </Button>
  );

  const setPriceTitle = 'Set a Price Per Item';

  return (
    <Modal
      className={styles['sale-modal-custom']}
      open={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
      destroyOnClose={true}
      title={`${type === 'add' ? 'List for Sale' : 'Edit Listing'}`}
      footer={footer}>
      <NftInfoListCard
        image={nftSaleInfo?.logoImage || ''}
        collectionName={nftSaleInfo?.collectionName}
        nftName={nftSaleInfo?.tokenName}
        item={handlePlurality(itemsForSell, 'item')}
        priceTitle={'Listing Price Per Item'}
        price={`${listingPrice?.price ? formatTokenPrice(listingPrice?.price) : '--'} ELF`}
        usdPrice={listingUSDPrice ? formatUSDPrice(listingUSDPrice) : '$ --'}
      />
      <SetSellItemNumber onChange={(value) => setItemsForSell(Number(value))} maxNumber={availableItemForSell} />
      <SetPrice
        floorPrice={nftSaleInfo?.floorPrice}
        lastSalePrice={nftSaleInfo?.lastDealPrice}
        onChange={setListingPrice}
        title={setPriceTitle}
        defaultPrice={listingPrice.price}
      />
      <Duration onChange={setDuration} defaultExpirationData={defaultData?.duration} />
      <SummaryInfo listingPrice={listingPrice?.price || ''} itemsForSell={itemsForSell} />
    </Modal>
  );
}
export const SaleModalERC1155 = NiceModal.create(SaleModalERC1155Constructor);

export const SaleModalForERC721 = NiceModal.create(SaleModalERC721Constructor);
