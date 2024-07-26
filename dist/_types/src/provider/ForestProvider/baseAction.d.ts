export declare function basicActions<T extends string, P = any>(type: T, payload?: P): {
    type: T;
    payload: P | undefined;
};
export type BasicActions<T = string> = {
    dispatch: (actions: {
        type: T;
        payload: any;
    }) => void;
};
