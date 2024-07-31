import { CreateTransactionEntityPayload } from "./type/createTransactionEntityPayload";

/**
 * Represents a transaction on the blockchain.
 * 
 * This class encapsulates all the necessary details for a transaction, including:
 * - Private key for signing (`privateKey`)
 * - Address of the ERC-20 token (if applicable) (`tokenAddress`)
 * - Array of recipient addresses (`receiverAddress`)
 * - Array of amounts to be sent (`amount`)
 * - Optional gas limit (`gasLimit`)
 * - Optional maximum base fee (`maxFeePerGas`)
 * - Optional priority fee (`maxPriorityFeePerGas`)
 * 
 * The static method `new` provides a convenient way to create an instance of the `Transaction` class.
 */

export class Transaction {
    privateKey: string;
    tokenAddress?: string;
    receiverAddress: string[];
    amount: string[];
    gasLimit?: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;

    constructor(payload: CreateTransactionEntityPayload) {
        this.privateKey = payload.privateKey;
        this.tokenAddress = payload.tokenAddress;
        this.receiverAddress = payload.receiverAddress;
        this.amount = payload.amount;
        this.gasLimit = payload.gasLimit;
        this.maxFeePerGas = payload.maxFeePerGas;
        this.maxPriorityFeePerGas = payload.maxPriorityFeePerGas;
    }

    public static async new(payload: CreateTransactionEntityPayload): Promise<Transaction> {
        const transaction: Transaction = new Transaction(payload);
        return transaction;
    }

}