export declare const ForestActions: {
    initialized: string;
    destroy: string;
    setWallet: string;
    setLoginStatus: string;
    setCurChain: string;
    setAelfInfo: string;
};
export interface ForestState {
    wallet?: any;
    aelfInfo?: any;
    chain?: any;
    isLogin?: boolean;
}
export declare const forestAction: {
    initialized: {
        type: string;
        actions: (initialized: ForestState) => {
            type: string;
            payload: {
                initialized: ForestState;
            } | undefined;
        };
    };
    setWallet: {
        type: string;
        actions: (wallet: any) => {
            type: string;
            payload: {
                wallet: any;
            } | undefined;
        };
    };
    setCurChain: {
        type: string;
        actions: (chain: any) => {
            type: string;
            payload: {
                chain: any;
            } | undefined;
        };
    };
    setAelfInfo: {
        type: string;
        actions: (aelfInfo: any) => {
            type: string;
            payload: {
                aelfInfo: any;
            } | undefined;
        };
    };
    setLoginStatus: {
        type: string;
        actions: (isLogin: boolean) => {
            type: string;
            payload: {
                isLogin: boolean;
            } | undefined;
        };
    };
};
