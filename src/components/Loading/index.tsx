import clsx from 'clsx';
import loadingImageL from 'assets/loadingL.png';
import Image from 'next/image';
import { memo } from 'react';

function Loading(props: { className?: string; imgStyle?: string }) {
  const isSmallScreen = true;

  return (
    <div
      className={clsx(
        'w-full flex items-center justify-center pb-[10px] box-border',
        isSmallScreen ? '!h-[100px]' : '!h-[120px]',
        props.className,
      )}>
      <Image
        src={loadingImageL}
        width={isSmallScreen ? 60 : 80}
        height={isSmallScreen ? 60 : 80}
        className={`animate-loading ${props.imgStyle} ${isSmallScreen ? '60px' : '80px'}}`}
        alt="default loading image"
      />
    </div>
  );
}

export default memo(Loading);
