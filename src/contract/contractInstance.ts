import { SupportedELFChainId } from 'constants/collection.ts';

export interface IWebLoginArgs {
  address: string;
  chainId: string;
}

export type ChainId = 'AELF' | 'tDVV' | 'tDVW';

type WebLoginInterface = any;

export interface CallContractParams<T> {
  contractAddress: string;
  methodName: string;
  args: T;
  options?: {
    chainId?: ChainId;
  };
}

export interface IWebLoginArgs {
  address: string;
  chainId: string;
}

type MethodType = <T, R>(params: CallContractParams<T>) => Promise<R>;

export default class WebLoginInstance {
  public contract: any;
  public address: string | undefined;
  public chainId: string | undefined;

  private static instance: WebLoginInstance | null = null;
  private context: WebLoginInterface | null = null;
  private aelfSendMethod?: MethodType = undefined;
  private aelfViewMethod?: MethodType = undefined;
  private tdvvSendMethod?: MethodType = undefined;
  private tdvvViewMethod?: MethodType = undefined;
  private tdvwSendMethod?: MethodType = undefined;
  private tdvwViewMethod?: MethodType = undefined;

  constructor(options?: IWebLoginArgs) {
    this.address = options?.address;
    this.chainId = options?.chainId;
  }
  static get() {
    if (!WebLoginInstance.instance) {
      WebLoginInstance.instance = new WebLoginInstance();
    }
    return WebLoginInstance.instance;
  }

  static set(instance: any) {
    WebLoginInstance.instance = instance;
  }

  setWebLoginContext(context: WebLoginInterface) {
    this.context = context;
  }

  setMethod({ chain, sendMethod, viewMethod }: { chain: Chain; sendMethod: MethodType; viewMethod: MethodType }) {
    switch (chain) {
      case SupportedELFChainId.MAIN_NET: {
        this.aelfSendMethod = sendMethod;
        this.aelfViewMethod = viewMethod;
        break;
      }
      case SupportedELFChainId.TDVV_NET: {
        this.tdvvSendMethod = sendMethod;
        this.tdvvViewMethod = viewMethod;
        break;
      }
      case SupportedELFChainId.TDVW_NET: {
        this.tdvwSendMethod = sendMethod;
        this.tdvwViewMethod = viewMethod;
        break;
      }
    }
  }

  setContractMethod(
    contractMethod: {
      chain: Chain;
      sendMethod: MethodType;
      viewMethod: MethodType;
    }[],
  ) {
    contractMethod.forEach((item) => {
      this.setMethod(item);
    });
  }

  getWebLoginContext() {
    return this.context; // wallet, login, loginState
  }

  contractSendMethod<T, R>(chain: Chain, params: CallContractParams<T>): Promise<R> {
    let contractMethod = null;
    const contract = WebLoginInstance.instance as any;

    switch (chain) {
      case SupportedELFChainId.MAIN_NET:
        contractMethod = contract.aelfSendMethod;
        break;
      case SupportedELFChainId.TDVV_NET:
        contractMethod = contract.tdvvSendMethod;
        break;
      case SupportedELFChainId.TDVW_NET:
        contractMethod = contract.tdvwSendMethod;
        break;
    }
    if (!contractMethod) {
      throw new Error('Error: Invalid chain ID');
    }
    return contractMethod(params);
  }

  contractViewMethod<T, R>(chain: Chain, params: CallContractParams<T>): Promise<R> {
    let contractMethod = null;
    const contract = WebLoginInstance.instance as any;

    switch (chain) {
      case SupportedELFChainId.MAIN_NET:
        contractMethod = contract.aelfViewMethod;
        break;
      case SupportedELFChainId.TDVV_NET:
        contractMethod = contract.tdvvViewMethod;
        break;
      case SupportedELFChainId.TDVW_NET:
        contractMethod = contract.tdvwViewMethod;
        break;
    }
    if (!contractMethod) {
      throw new Error('Error: Invalid chain ID');
    }
    return contractMethod(params);
  }

  callContract<T>(params: CallContractParams<T>) {
    return this.context?.callContract(params);
  }
}

export const webLoginInstance = WebLoginInstance.get();
