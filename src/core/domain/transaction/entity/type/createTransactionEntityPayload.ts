export type CreateTransactionEntityPayload = {
    chainId: number,
    privateKey: string,
    tokenAddress?: string,
    receiverAddress: string[],
    amount: string[],
    gasLimit?: string,
    maxBaseFee?: string,
    priorityFee?: string
}