export interface ITransitionFee {
    transactionFee?: number;
    transactionFeeOfUsd?: number;
    forestServiceRate?: number;
    creatorLoyaltyRate?: number;
}
export default function useGetTransitionFee(): {
    loading: boolean;
    transactionFee: ITransitionFee | undefined;
};
