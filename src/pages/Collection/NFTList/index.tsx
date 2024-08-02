import { Card, List } from 'antd';
// import useColumns from 'hooks/useColumns';
// import { NFTListTable } from '../NftListTable';
// import TableEmpty, { emptyEnum } from 'components/TableEmpty';
import { useMemo } from 'react';
import Link from 'next/link';
import styles from './style.module.css';
// import { ImageEnhance } from 'components/ImgLoading';
// import { formatTokenPrice } from 'utils/format';
import clsx from 'clsx';
import { BoxSizeEnum, emptyEnum } from 'constants/collection.ts';
import { ImageEnhance } from 'components/ImageEnhance/index.tsx';
import HonourLabel from 'components/Base/HonourLabel/index.tsx';
import { formatTokenPrice } from '../util';
import TableEmpty from 'components/TableEmpty/index.tsx';
// import { BoxSizeEnum } from 'pagesComponents/ExploreItem/constant';

// import HonourLabel from 'baseComponents/HonourLabel';

interface INFTListProps {
  collapsed: boolean;
  sizes: BoxSizeEnum;
  className?: string;
  dataSource: INftInfo[];
  hasSearch?: boolean;
  clearFilter?: () => void;
  loading: boolean;
  ELFToDollarRate: number;
}

interface ItemsCardProps {
  dataSource?: INftInfo;
  className?: string;
  priceClassName?: string;
  extraActions?: React.ReactNode;
  hiddenActions?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function ItemsCard({ dataSource, className, priceClassName, onClick }: ItemsCardProps) {
  const convertType = useMemo(() => {
    if (dataSource?.fileExtension === 'mp3') return 'audio';
    if (dataSource?.fileExtension === 'mp4') return 'video';
    return 'image';
  }, [dataSource?.fileExtension]);
  const price = dataSource?.price || dataSource?.listingPrice;

  return (
    <Link href={`/detail?symbol=${dataSource?.nftSymbol}&from=all&source=telegram&callbackPath=collection`}>
      <Card
        className={`${styles['items-card-wrapper']} h-full ${className}`}
        onClick={onClick}
        cover={
          <>
            {convertType !== 'image' && (
              <div className={styles['mark']}>{dataSource?.fileExtension?.toUpperCase()}</div>
            )}
            <div className={styles['item__wrapper']}>
              <ImageEnhance className={styles['item__image']} width={'100%'} src={dataSource?.previewImage || ''} />
              {dataSource?.describe ? (
                <div className={styles['item_honour']}>
                  <HonourLabel text={dataSource?.describe} />
                </div>
              ) : null}
            </div>
          </>
        }>
        <div className={styles.card__content}>
          <div className={styles.nft__symbol}>{dataSource?.nftSymbol}</div>
          <div className={styles.token__name}>{dataSource?.tokenName}</div>
          <div className={clsx(styles.token__price, priceClassName)}>
            <span className={styles.token__label}>{dataSource?.priceDescription || 'Price'}</span>
            <span className={styles.token__price__text}>
              {price && price >= 0 ? formatTokenPrice(price) + ' ELF' : '--'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function NFTList({
  sizes,
  collapsed,
  dataSource,
  hasSearch,
  clearFilter,
  loading,
  ELFToDollarRate,
}: INFTListProps) {
  const column = 2;

  //   if (sizes === BoxSizeEnum.details) {
  //     return <NFTListTable ELFToDollarRate={ELFToDollarRate} dataSource={dataSource || []} loading={loading} />;
  //   }

  return (
    <div id="nft-list" className={styles['nft__list_wrapper']}>
      <List
        grid={{ gutter: 16, column: column }}
        locale={{
          emptyText: (
            <TableEmpty
              type={emptyEnum.nft}
              searchText={(hasSearch && 'search') || ''}
              clearFilter={clearFilter && clearFilter}
            />
          ),
        }}
        loading={loading}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <ItemsCard hiddenActions={false} key={item?.id} dataSource={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
