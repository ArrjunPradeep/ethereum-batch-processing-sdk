export interface sendCoinPort {
    privateKey: string,
    receiverAddress: string[],
    amount: string[],
    gasLimit?: string,
    maxFeePerGas?: string,
    maxPriorityFeePerGas?: string
}