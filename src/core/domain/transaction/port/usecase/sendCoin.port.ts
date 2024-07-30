export interface sendCoinPort {
    chainId: number,
    privateKey: string,
    receiverAddress: string[],
    amount: string[],
    gasLimit?: string,
    maxBaseFee?: string,
    priorityFee?: string
}