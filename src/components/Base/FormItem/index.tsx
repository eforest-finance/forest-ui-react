import { ReactComponent as Required } from 'assets/required.svg';
import clsx from 'clsx';
import { ReactElement, ReactNode, useMemo } from 'react';
import styles from './index.module.css';

export default function FormItem(options: {
  title: string;
  suffix?: ReactElement;
  require?: boolean;
  description?: ReactElement | string;
  error?: {
    msg: ReactNode;
  };
  children?: ReactElement;
}) {
  const { title, suffix, require, description, children, error } = options;
  const isSmallScreen = true;

  return useMemo(
    () => (
      <div
        className={clsx(
          'form-item',
          isSmallScreen && 'mobile-form-item',
          '[&:not(:first-child)]:mt-[24px]',
          'mdTW:[&:not(:first-child)]:mt-[40px]',
        )}>
        <p className={styles['title-wrapper']}>
          <span className="form-title-text">{title}</span>
          {suffix ? <span className="ml-[8px] flex items-center h-[27px]">{suffix}</span> : null}
          {require ? <Required className="ml-[9px] mr-[-2px]" /> : ''}
        </p>
        {description ? (
          <p className="form-description font-medium mt-[8px] text-textSecondary text-[14px] leading-[21px]">
            {description}
          </p>
        ) : null}
        {children}
        {error && <div className={styles.err}>{error?.msg}</div>}
      </div>
    ),
    [children, description, require, suffix, title, isSmallScreen, error],
  );
}
