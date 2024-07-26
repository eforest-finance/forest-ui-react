import React from 'react';
import styles from './style.module.css';
import clsx from 'clsx';
import { ImageEnhance } from 'components/ImageEnhance/index.tsx';

export interface INftInfoListCard {
  image?: string | undefined;
  collectionName?: string;
  nftName?: string;
  item?: string;
  priceTitle?: string;
  price?: string | number;
  usdPrice?: string | number;
  imageSizeType?: 'cover' | 'contain';
}

const NftInfoListCard = (props: INftInfoListCard) => {
  const { collectionName, nftName, item, priceTitle, price, usdPrice } = props;
  const isSmallScreen = true;

  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.flexWrap}>
          {props.image && (
            <div className="w-[84px] h-[84px] mr-[16px] flex justify-center items-center overflow-hidden rounded-md border border-solid border-lineBorder">
              <ImageEnhance src={props.image} className={styles.image} />
            </div>
          )}
          {/* 
          {!isSmallScreen && (
            <div className="flex flex-1 flex-col min-h-full justify-around items-start overflow-hidden">
              {collectionName && (
                <p className={clsx('text-base font-medium text-textSecondary', styles['nft-list-card-text-ellipsis'])}>
                  {collectionName}
                </p>
              )}

              <p className={clsx('text-xl font-semibold text-textPrimary', styles['nft-list-card-text-ellipsis'])}>
                {nftName}
              </p>
              <p className={clsx('text-base font-medium text-textSecondary', styles['nft-list-card-text-ellipsis'])}>
                {item}
              </p>
            </div>
          )} */}
        </div>
        <div className={styles.right}>
          {priceTitle && <p className={styles.priceTitle}>{priceTitle}</p>}
          {price && <p className={styles.price}>{price}</p>}
          {usdPrice && <p className={styles.usdPrice}>{usdPrice}</p>}
        </div>
      </div>
      {isSmallScreen && (
        <div className={styles.collectionWrapper}>
          <p className={styles.collectionName}>{collectionName}</p>
          <div className={styles.nftWrapper}>
            <p className={styles.nftName}>{nftName}</p>
            <p className={styles.nftItem}>{item}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(NftInfoListCard);
