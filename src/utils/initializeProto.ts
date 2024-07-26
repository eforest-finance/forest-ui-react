import { Proto } from './proto';
import { Store } from '../..';
import { getProto } from './log';

export const currentRpcUrl = {
  AELF: 'rpcUrlAELF',
  tDVW: 'rpcUrlTDVW',
  tDVV: 'rpcUrlTDVV',
};

const initializeProto = async (contractAddress: string) => {
  const { aelfInfo: configInfo } = Store.getInstance().getStore();
  const sideChain = currentRpcUrl[configInfo?.curChain as Chain];

  if (configInfo?.[sideChain] && contractAddress) {
    const protoBuf = await getProto(contractAddress, configInfo?.[sideChain]);
    console.log('protoBuf', protoBuf);
    const proto = Proto.getInstance();
    proto.setProto(contractAddress, protoBuf);
  }
};

export default initializeProto;
