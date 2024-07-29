import { CreateTransactionEntityPayload } from "./type/createTransactionEntityPayload";

/**
 * Represents a transaction on the blockchain.
 * 
 * This class encapsulates all the necessary details for a transaction, including:
 * - Blockchain network ID (`chainId`)
 * - Private key for signing (`privateKey`)
 * - Address of the ERC-20 token (if applicable) (`tokenAddress`)
 * - Array of recipient addresses (`receiverAddress`)
 * - Array of amounts to be sent (`amount`)
 * - Optional gas limit (`gasLimit`)
 * - Optional maximum base fee (`maxBaseFee`)
 * - Optional priority fee (`priorityFee`)
 * 
 * The static method `new` provides a convenient way to create an instance of the `Transaction` class.
 */

export class Transaction {

    chainId: number;
    privateKey: string;
    tokenAddress?: string;
    receiverAddress: string[];
    amount: number[];
    gasLimit?: string;
    maxBaseFee?: string;
    priorityFee?: string;

    constructor(payload: CreateTransactionEntityPayload) {
        this.chainId = payload.chainId;
        this.privateKey = payload.privateKey;
        this.tokenAddress = payload.tokenAddress;
        this.receiverAddress = payload.receiverAddress;
        this.amount = payload.amount;
        this.gasLimit = payload.gasLimit;
        this.maxBaseFee = payload.maxBaseFee;
        this.priorityFee = payload.priorityFee;
    }

    public static async new(payload: CreateTransactionEntityPayload): Promise<Transaction> {
        const transaction: Transaction = new Transaction(payload);
        return transaction;
    }

}