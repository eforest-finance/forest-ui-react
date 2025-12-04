export interface LoginStatusProps {
    isLogin: boolean;
    login?: () => {};
}
export declare function useLoginStatus(props: LoginStatusProps): void;
