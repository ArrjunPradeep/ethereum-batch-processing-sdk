export type CreateTransactionEntityPayload = {
    chainId: number,
    privateKey: string,
    tokenAddress?: string,
    receiverAddress: string[],
    amount: number[],
    gasLimit?: string,
    maxBaseFee?: string,
    priorityFee?: string
}