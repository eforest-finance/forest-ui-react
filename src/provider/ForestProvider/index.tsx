import React, { createContext, useContext, useMemo, useReducer, useRef } from 'react';
import { BasicActions } from './baseAction';
import { ForestActions, ForestState } from './actions';
import NiceModal from '@ebay/nice-modal-react';
import { Store } from 'provider/class/store.ts';
import request, { cmsRequest, tokenRequest } from '../../api/request.ts';

const INITIAL_STATE = {
  chain: 'tDVW',
};

const ForestContext = createContext<any>(INITIAL_STATE);

export function useForestStore(): [ForestState, BasicActions] {
  return useContext(ForestContext);
}

//reducer
function reducer(state: ForestState, { type, payload }: any) {
  switch (type) {
    case ForestActions.setAelfInfo: {
      const info = payload.aelfInfo;
      if (!info) return state;

      Store.getInstance().setStore('aelfInfo', info);

      return Object.assign({}, state, { aelfInfo: info });
    }
    case ForestActions.setWallet: {
      const wallet = payload.wallet;
      if (!wallet) return state;

      return Object.assign({}, state, { wallet: wallet });
    }
    case ForestActions.setCurChain: {
      const chain = payload.chain;
      if (!chain) return state;

      const baseUrl = chain === 'tDVW' ? 'https://test.eforest.finance/' : 'https://www.eforest.finance/';
      request.resetBaseUrl(baseUrl);

      return Object.assign({}, state, { chain });
    }
    case ForestActions.setLoginStatus: {
      const isLogin = payload.isLogin;

      return Object.assign({}, state, { isLogin });
    }
    default: {
      return Object.assign({}, state, payload);
    }
  }
}

export function ForestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const providerValue = useMemo<[ForestState, { dispatch: React.Dispatch<any> }]>(() => {
    return [
      {
        ...state,
      },
      { dispatch },
    ];
  }, [state]);

  return (
    <ForestContext.Provider value={providerValue}>
      <NiceModal.Provider>{children}</NiceModal.Provider>
    </ForestContext.Provider>
  );
}

export default ForestProvider;
