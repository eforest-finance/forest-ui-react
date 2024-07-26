import { ImageEnhance } from '../../ImageEnhance';
import { StaticImageData } from 'next/image';
import React from 'react';
import styles from './index.module.css';

export interface INftInfoCard {
  logoImage?: string | StaticImageData | undefined;
  subTitle?: string;
  title?: string;
  extra?: string;
}

interface IProps {
  previewImage?: string | StaticImageData | undefined;
  info?: INftInfoCard;
}

const NftInfoCard = (props: IProps) => {
  const { previewImage, info } = props;
  return (
    <div className={styles.wrap}>
      {previewImage && <ImageEnhance src={previewImage} className={styles.preview} />}
      {info && (
        <>
          <div className={styles.info}>
            {info?.logoImage && <ImageEnhance src={info?.logoImage} className={styles.logo} />}
            {info.subTitle && <span className="text-textSecondary text-base">{info.subTitle}</span>}
          </div>
          {info?.title && <span className="font-semibold text-xl text-textPrimary ">{info.title}</span>}

          {info?.extra && <span className="text-textSecondary text-base font-medium">{info.extra}</span>}
        </>
      )}
    </div>
  );
};

export default React.memo(NftInfoCard);
