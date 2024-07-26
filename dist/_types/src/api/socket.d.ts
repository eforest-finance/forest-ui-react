type SignalRParams = {
    url: string;
};
type HandlerFn = (data: any) => void;
export default class SignalR {
    private connection;
    private url;
    private handlerMap;
    static instance: SignalR | null;
    constructor({ url }: SignalRParams);
    static getInstance({ url }: SignalRParams): SignalR;
    initAndStart: () => Promise<void>;
    listen: () => void;
    registerHandler: (message: string, handler: HandlerFn) => void;
    unRegisterHandler: (message: string, handler: HandlerFn) => void;
    dispatchMessage: (message: string, data: any) => void;
    sendEvent: (name: string, ...rest: any[]) => void;
}
export {};
