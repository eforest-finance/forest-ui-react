import { Store } from '../..';

export const getForestContractAddress = () => {
  const { aelfInfo: info } = Store.getInstance().getStore();

  return {
    main: info?.forestMainAddress as unknown as string,
    side: info?.forestSideAddress as unknown as string,
  };
};
