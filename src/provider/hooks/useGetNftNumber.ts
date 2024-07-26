import { useEffect, useState } from 'react';
import { getNFTNumber as getNFTNumberFun } from 'utils/getNftNumber.ts';
import { initializationNftNumber, setNftNumber } from 'store/reducer/detail/detailInfo';
import { Store, useForestStore } from '../../..';

enum SupportedELFChainId {
  MAIN_NET = 'AELF',
  TDVV_NET = 'tDVV',
  TDVW_NET = 'tDVW',
}

export default function useGetNftNumber({ nftSymbol, chainId }: { nftSymbol?: string; chainId?: Chain }): any {
  const [{ isLogin = true }, { dispatch }] = useForestStore();
  const walletInfo = Store.getInstance().getValue('walletInfo');
  console.log('walletInfo:', walletInfo);

  const [nftNumber, setNftNumber] = useState<any>({});

  const getNFTNumber = async ({ nftSymbol, chainId }: { nftSymbol?: string; chainId?: Chain }) => {
    const currentChain = chainId || SupportedELFChainId.TDVW_NET;
    const owner = currentChain === SupportedELFChainId.MAIN_NET ? walletInfo.aelfChainAddress : walletInfo.address;

    console.log(isLogin, owner);

    if (!(isLogin && owner)) return;

    const nftNumber = await getNFTNumberFun({
      owner,
      nftSymbol,
      chainId: currentChain,
    });
    setNftNumber(nftNumber);
    console.log('nftNumber::', nftNumber);
  };

  useEffect(() => {
    getNFTNumber({ nftSymbol, chainId });

    // if (isLogin && nftSymbol) {
    //   getNFTNumber({ nftSymbol, chainId });
    // } else {
    //   store.dispatch(setNftNumber(initializationNftNumber));
    // }
  }, [isLogin, nftSymbol, chainId, walletInfo.address, walletInfo.aelfChainAddress]);

  return {
    getNFTNumber,
    nftNumber,
  };
}
