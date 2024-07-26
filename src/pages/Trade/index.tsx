import React, { useEffect } from 'react';

import { useBuy, useSell } from 'provider/index.ts';

import './index.css';

export const GreetingComponent = ({ name }: { name: string }) => {
  const nftInfo = {
    tokenName: 'SGRTEST-8251GEN9',
    nftCollection: {
      tokenName: 'TestSchrödinger',
      logoImage: 'https://forest-testnet.s3.ap-northeast-1.amazonaws.com/1721652551482-a.jpg',
    },
    chainId: 'tDVW',
    nftSymbol: 'SGRTEST-8251',
    id: 'tDVW-SGRTEST-8251',
    previewImage:
      'https://forest-testnet.s3.amazonaws.com/Forest-test/042452e788c39acbe30f10cec2245e35538d2e13c490a9a62fd5eb0c2c45f95b_2iJ4dajvT7f34HkGr7LsUrrFdyyuPr3A1y7rMwfCzrufuiAido_1721652912027.png',
  };
  // const { buyNow } = useBuy({ nftInfo });
  const { sell } = useSell({ nftInfo });

  useEffect(() => {
    // buyNow();
  }, []);

  return (
    <div
      className="test text-blue-500"
      onClick={() => {
        sell();
      }}>
      show
    </div>
  );
};

export default GreetingComponent;
