import React, { ReactNode, useMemo, useState } from 'react';
import { ReactComponent as Jump } from 'assets/jump.svg';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { StaticImageData } from 'next/image';
import Button from 'components/Base/Button/index.tsx';
import Modal from 'components/Base/Modal/index.tsx';
import NftInfoList, { INftInfoList } from '../PromptModal/NftInfoList';
import NftInfoCard, { INftInfoCard } from '../PromptModal/NftInfoCard';
import styles from './style.module.css';

interface IProps {
  previewImage?: string | StaticImageData;
  title?: string;
  description?: string | ReactNode | string[];
  hideButton?: boolean;
  buttonInfo?: {
    btnText?: string;
    openLoading?: boolean;
    onConfirm?: <T, R>(params?: T) => R | void | Promise<void>;
  };
  info: INftInfoCard;
  jumpInfo?: {
    url?: string;
    btnText?: string;
  };
  error?: {
    title?: string | ReactNode;
    description?: string | ReactNode | string[];
    list?: INftInfoList[];
  };
  onCancel?: <T, R>(params?: T) => R | void;
}

function ResultModal({
  previewImage,
  jumpInfo,
  title,
  description,
  buttonInfo,
  hideButton = false,
  info,
  error,
  onCancel,
}: IProps) {
  const modal = useModal();
  const isSmallScreen = true;

  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = true;

  const aProps = useMemo(() => (isMobile ? {} : { target: '_blank', rel: 'noreferrer' }), []);

  const onClick = async () => {
    if (buttonInfo?.onConfirm) {
      if (buttonInfo.openLoading) {
        setLoading(true);
      }
      await buttonInfo.onConfirm();
      setLoading(false);
      return;
    }
    modal.hide();
    return;
  };

  const JumpInfo = useMemo(
    () =>
      jumpInfo ? (
        <a href={jumpInfo.url} {...aProps} className="flex items-center text-textSecondary">
          {jumpInfo.btnText || 'View on aelf Explorer'} <Jump className="fill-textSecondary w-4 h-4 ml-2" />
        </a>
      ) : null,
    [aProps, jumpInfo],
  );

  const footerPc =
    hideButton && !jumpInfo ? null : (
      <div className="w-full flex flex-col items-center">
        {!hideButton ? (
          <Button
            type="primary"
            size="ultra"
            loading={loading}
            isFull={isSmallScreen ? true : false}
            className={`${!isSmallScreen && '!w-[256px]'}`}
            onClick={onClick}>
            {buttonInfo?.btnText || 'View'}
          </Button>
        ) : null}

        {jumpInfo ? <div className="mt-[16px]">{JumpInfo}</div> : null}
      </div>
    );

  const footerMobile = hideButton ? null : (
    <div className="w-full flex flex-col items-center">
      <Button
        type="primary"
        size="ultra"
        loading={loading}
        isFull={isSmallScreen ? true : false}
        className={`${!isSmallScreen && '!w-[256px]'}`}
        onClick={onClick}>
        {buttonInfo?.btnText || 'View'}
      </Button>
    </div>
  );

  const getDescriptionCom = (description: string | ReactNode | string[]) => {
    if (typeof description === 'string') {
      return <p>{description}</p>;
    } else if (description instanceof Array) {
      return description.map((item, index) => {
        return <p key={index}>{item}</p>;
      });
    } else {
      return description;
    }
  };

  return (
    <Modal
      title=" "
      open={modal.visible}
      onOk={modal.hide}
      onCancel={onCancel || modal.hide}
      afterClose={modal.remove}
      footer={isSmallScreen ? footerMobile : footerPc}>
      <div className={styles.wrap}>
        <NftInfoCard previewImage={previewImage} info={info} />
        <div className="flex flex-col items-center mt-[24px] mdTW:mt-[48px]">
          <span className={styles.title}>{title}</span>
          <p className={styles.desc}>{getDescriptionCom(description)}</p>
        </div>
        {error && (
          <div className={styles.errWrap}>
            <span className={styles.errTitle}>{error.title}</span>
            {error.description ? <p className={styles.errDesc}>{getDescriptionCom(error.description)}</p> : null}

            {error?.list?.length && (
              <div className="mt-[32px]">
                {error.list?.map((item, index) => {
                  return <NftInfoList key={index} {...item} />;
                })}
              </div>
            )}
          </div>
        )}
        {isSmallScreen ? <div className={styles.jumpInfo}>{JumpInfo}</div> : null}
      </div>
    </Modal>
  );
}

export default NiceModal.create(ResultModal);
