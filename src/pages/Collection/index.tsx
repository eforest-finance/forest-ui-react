import { useParams, useRouter } from 'next/navigation';
import useNFTCollectionInfoService from './hooks/useNFTCollectionInfoService';
import CollectionsInfoCard from './CollectionInfoCard';
import ExploreTab from './ExploreTab';
import { useGetELFToDollarRate } from './hooks/useGetELFRateService';

import clsx from 'clsx';
import ExploreItem from './ExploreItem';
import ActivityItem from './ActivityItem';

import '../../styles/tailwind.css';

interface IExploreItemPage {
  nftCollectionId: string;
}

const ExploreItemPage: React.FC<IExploreItemPage> = (props: IExploreItemPage) => {
  const { nftCollectionId } = props;

  // const nftCollectionId = address[0];
  // const activeTab = address[1];

  //   const nftCollectionId = 'tDVW-SGRTEST-0';

  const activeTab = 'items';

  const { ELFToDollarRate } = useGetELFToDollarRate();
  //   const { nftCollectionInfo, currentUserIsMinter } = useNFTCollectionInfoService(nftCollectionId);
  return (
    <div className="px-4 smTW:px-10">
      <ExploreTab
        items={[
          {
            label: (
              <span
                className={clsx(
                  'text-base font-semibold text-textSecondary',
                  activeTab !== 'activity' && '!text-textPrimary',
                )}>
                Items
              </span>
            ),
            key: 'items',
            children: <ExploreItem nftCollectionId={nftCollectionId} ELFToDollarRate={ELFToDollarRate} />,
          },
        ]}
        defaultActiveKey={activeTab || 'items'}
        // onChange={(key) => {
        //   nav.replace(`/${key}`);
        // }}
      />
    </div>
  );
};

export default ExploreItemPage;
