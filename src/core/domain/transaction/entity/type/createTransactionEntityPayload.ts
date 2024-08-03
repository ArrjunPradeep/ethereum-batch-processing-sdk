/**
 * Defines the structure of the payload used to create a Transaction entity.
 * 
 * This type ensures that all necessary information is provided when creating
 * a new Transaction entity, including:
 * - `privateKey`: The private key for signing the transaction.
 * - `tokenAddress` (optional): The address of the ERC-20 token.
 * - `receiverAddress`: An array of recipient addresses.
 * - `amount`: An array of amounts to be sent to the respective recipient addresses.
 * - `gasLimit` (optional): The gas limit for the transaction.
 * - `maxFeePerGas` (optional): The maximum base fee for the transaction.
 * - `maxPriorityFeePerGas` (optional): The priority fee for the transaction.
 */
export type CreateTransactionEntityPayload = {
    privateKey: string,
    tokenAddress?: string,
    receiverAddress: string[],
    amount: string[],
    gasLimit?: string,
    maxFeePerGas?: string,
    maxPriorityFeePerGas?: string
}