export declare class Proto {
    private proto;
    private static instance;
    private constructor();
    static getInstance(): Proto;
    setProto(contractAddress: string, proto: any): void;
    getProto(contractAddress?: string): any;
}
