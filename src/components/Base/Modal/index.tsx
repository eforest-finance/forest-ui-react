import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import styles from './index.module.css';
import btnStyles from 'components/Base/Button/index.module.css';
import { ReactComponent as Close } from 'assets/clear.svg';
export interface ModalProps extends AntdModalProps {
  subTitle?: string;
}
function Modal(props: ModalProps) {
  const { children, className, title, subTitle, wrapClassName } = props;
  const isSmallScreen = true;

  return (
    <AntdModal
      keyboard={false}
      maskClosable={false}
      destroyOnClose={true}
      closeIcon={<Close />}
      width={800}
      centered
      {...props}
      className={`${styles.modal} ${isSmallScreen && styles['modal-mobile']} ${className || ''}`}
      wrapClassName={`${styles['modal-wrap']} ${wrapClassName}`}
      okButtonProps={{
        className: `${btnStyles.button}`,
      }}
      cancelButtonProps={{
        className: `${btnStyles.button}`,
      }}
      title={
        <div>
          <div className="pr-8 break-words">{title}</div>
          {subTitle && <div className=" text-base font-medium mt-8 text-textSecondary">{subTitle}</div>}
        </div>
      }>
      {children}
    </AntdModal>
  );
}

export default React.memo(Modal);
