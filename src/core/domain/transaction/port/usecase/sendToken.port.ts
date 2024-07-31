export interface sendTokenPort {
    privateKey: string,
    tokenAddress?: string,
    receiverAddress: string[],
    amount: string[],
    gasLimit?: string,
    maxFeePerGas?: string,
    maxPriorityFeePerGas?: string
}