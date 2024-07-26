export declare const getBalance: ({ owner, symbol }: IGetBalanceParams, chainId: Chain) => Promise<any>;
export declare const getTokenInfo: ({ symbol }: IGetTokenInfoParams, chainId: Chain) => Promise<{
    supply: any;
    totalSupply: any;
    decimals: any;
} | {
    supply: number;
    totalSupply: number;
    decimals?: undefined;
} | undefined>;
export declare const getNFTNumber: ({ owner, nftSymbol, chainId, }: {
    owner: string;
    nftSymbol?: string | undefined;
    chainId: Chain;
}) => Promise<{} | undefined>;
