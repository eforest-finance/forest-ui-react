import { basicActions } from './baseAction';

export const ForestActions = {
  initialized: 'INITIALIZED',
  destroy: 'DESTROY',
  setWallet: 'setWallet',
  setLoginStatus: 'setLoginStatus',
  setCurChain: 'setCurChain',
  setAelfInfo: 'setAelfInfo',
};

export interface ForestState {
  wallet?: any;
  aelfInfo?: any;
  chain?: any;
  isLogin?: boolean;
}

export const forestAction = {
  initialized: {
    type: ForestActions['initialized'],
    actions: (initialized: ForestState) => basicActions(ForestActions['initialized'], { initialized }),
  },
  setWallet: {
    type: ForestActions['setWallet'],
    actions: (wallet: any) => basicActions(ForestActions['setWallet'], { wallet }),
  },
  setCurChain: {
    type: ForestActions['setCurChain'],
    actions: (chain: any) => basicActions(ForestActions['setCurChain'], { chain }),
  },
  setAelfInfo: {
    type: ForestActions['setAelfInfo'],
    actions: (aelfInfo: any) => basicActions(ForestActions['setAelfInfo'], { aelfInfo }),
  },
  setLoginStatus: {
    type: ForestActions['setLoginStatus'],
    actions: (isLogin: boolean) => basicActions(ForestActions['setAelfInfo'], { isLogin }),
  },
};
