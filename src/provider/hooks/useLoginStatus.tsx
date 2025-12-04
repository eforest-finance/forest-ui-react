import { useEffect } from 'react';
import { useForestStore } from '../../..';
import { Manager } from '../class/functionManger';

export interface LoginStatusProps {
  isLogin: boolean;
  login?: () => {};
}

export function useLoginStatus(props: LoginStatusProps) {
  const { isLogin, login } = props;
  const [{ isLogin: walletStatus }, { dispatch }] = useForestStore();
  useEffect(() => {
    dispatch({
      type: 'setLoginStatus',
      payload: {
        isLogin: isLogin,
      },
    });
  }, [isLogin]);

  useEffect(() => {
    Manager.getInstance().setLogin(login);
  }, [login]);
}
