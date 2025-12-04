import React, { useState } from 'react';
import { ReactComponent as Jump } from 'assets/jump.svg';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from 'components/Base/Button/index.tsx';
import Modal from 'components/Base/Modal/index.tsx';
import { ImageEnhance } from 'components/ImageEnhance/index.tsx';
import { useNiceModalCommonService } from '../hooks/useNiceModalCommonService';
import styles from './ListingSuccessModal.module.css';

function ListingSuccessModalConstructor({
  nftInfo,
  explorerUrl,
  onViewMyListing,
}: {
  nftInfo: INftInfo | null;
  explorerUrl?: string;
  onViewMyListing?: () => void;
}) {
  const modal = useModal();
  useNiceModalCommonService(modal);
  const isSmallScreen = true;
  const [loading] = useState<boolean>(false);

  const aProps = { target: '_blank', rel: 'noreferrer' };

  const footer = (
    <div className="flex flex-1 flex-col items-center">
      <Button
        loading={loading}
        type="primary"
        size="ultra"
        className={`${!isSmallScreen ? '!w-[256px]' : 'w-full'}`}
        onClick={() => {
          modal.hide();
          onViewMyListing && onViewMyListing();
        }}>
        View My Listing
      </Button>
      {!isSmallScreen ? (
        <a href={explorerUrl} {...aProps} className="flex justify-center items-center text-textSecondary mt-4">
          View on aelf Explorer <Jump className="fill-textSecondary w-4 h-4 ml-2" />
        </a>
      ) : null}
    </div>
  );

  return (
    <Modal
      title=" "
      open={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
      footer={footer}>
      <div className={styles.wrap}>
        <div className={styles.imageWrap}>
          {nftInfo?.previewImage && <ImageEnhance src={nftInfo?.previewImage} className={styles.previewImage} />}
          <div className={styles.logoWrap}>
            {nftInfo?.nftCollection?.logoImage && (
              <ImageEnhance src={nftInfo?.nftCollection?.logoImage} className={styles.logo} />
            )}
            <span className={styles.collectionName}>{nftInfo?.nftCollection?.tokenName}</span>
          </div>

          <span className={styles.tokenName}>{nftInfo?.tokenName}</span>
        </div>
        <div className={styles.content}>
          <span className={styles['content_title']}>NFT Successfully Listed!</span>
          <span className={styles['content_text']}>
            {nftInfo?.tokenName} NFT in the {nftInfo?.nftCollection?.tokenName} collection has been listed for sale.
          </span>
        </div>
        {isSmallScreen ? (
          <a href={explorerUrl} {...aProps} className={styles['aelf_link']}>
            View on aelf Explorer <Jump className="fill-textSecondary w-4 h-4 ml-2" />
          </a>
        ) : null}
      </div>
    </Modal>
  );
}
export const ListingSuccessModal = NiceModal.create(ListingSuccessModalConstructor);
