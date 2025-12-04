export declare class Store {
    private store;
    private static instance;
    private constructor();
    static getInstance(): Store;
    getStore(): Record<string, any>;
    setStore(key: string, value: any): void;
    getValue(key: string): any;
}
