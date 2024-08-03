/**
 * Interface for the Send Token Use Case Port.
 * 
 * This interface defines the structure of data required to send tokens. It specifies the properties that must
 * be provided for the token transfer operation. Implementations of this interface should handle the logic for
 * sending tokens using the provided details.
 */
export interface sendTokenPort {
    /**
     * The private key used for signing the transaction.
     * 
     * @type {string}
     */
    privateKey: string,

    /**
     * Optional address of the ERC-20 token being sent.
     * 
     * @type {string}
     */
    tokenAddress?: string,

    /**
     * Array of recipient addresses where the tokens will be sent.
     * 
     * @type {string[]}
     */
    receiverAddress: string[],

    /**
     * Array of amounts to be sent to each recipient address.
     * 
     * @type {string[]}
     */
    amount: string[],

    /**
     * Optional gas limit for the transaction.
     * 
     * @type {string}
     */
    gasLimit?: string,

    /**
     * Optional maximum fee per gas unit.
     * 
     * @type {string}
     */
    maxFeePerGas?: string,

    /**
     * Optional maximum priority fee per gas unit.
     * 
     * @type {string}
     */
    maxPriorityFeePerGas?: string
}