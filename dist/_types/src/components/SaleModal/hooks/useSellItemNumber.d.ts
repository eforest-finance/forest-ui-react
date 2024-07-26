export interface ISetSellItemNumberProps {
    onChange?: (value: number | string) => void;
    maxNumber?: number;
}
export declare function useSellItemNumber({ onChange, maxNumber }: ISetSellItemNumberProps): {
    maxNumber: number | undefined;
    inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number | undefined;
    status: "" | "error" | undefined;
};
