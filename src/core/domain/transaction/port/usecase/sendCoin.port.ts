export interface sendCoinPort {
    chainId: number,
    privateKey: string,
    receiverAddress: string[],
    amount: number[],
    gasLimit?: string,
    maxBaseFee?: string,
    priorityFee?: string
}