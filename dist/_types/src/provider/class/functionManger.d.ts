export declare class Manager {
    private manager;
    private static instance;
    private constructor();
    static getInstance(): Manager;
    setLogin(loginFunction: any): void;
}
