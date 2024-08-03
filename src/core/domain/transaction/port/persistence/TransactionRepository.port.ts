/**
 * Interface for the Transaction Repository Port.
 * 
 * This interface defines the contract for the Transaction Repository, which handles
 * data persistence and operations related to transactions. Implementations of this
 * interface should provide the actual logic for interacting with data storage systems
 * (e.g., databases) and performing the necessary operations.
 * 
 * The methods in this interface typically involve processing transactions, estimating gas,
 * and other related tasks.
 */
import { Transaction } from "../../entity/transaction.entity";

export interface TransactionRepositoryPort {

    /**
     * Method to handle sending coins.
     * 
     * This method takes a `Transaction` object as input, which contains the details of the
     * transaction to be processed. The implementation should handle the logic for sending
     * coins based on the provided transaction details.
     * 
     * @param transaction - The transaction details for sending coins.
     * @returns A promise that resolves with the result of the send operation.
     */
    sendCoin(transaction: Transaction): Promise<any>;

    /**
     * Method to handle sending tokens.
     * 
     * This method takes a `Transaction` object as input, which contains the details of the
     * transaction to be processed. The implementation should handle the logic for sending
     * tokens based on the provided transaction details.
     * 
     * @param transaction - The transaction details for sending tokens.
     * @returns A promise that resolves with the result of the send operation.
     */
    sendToken(transaction: Transaction): Promise<any>;

    /**
     * Method to estimate gas costs.
     * 
     * This method provides a way to estimate the gas costs associated with transactions.
     * The implementation should provide the logic for calculating and returning the estimated
     * gas costs based on the current network conditions and transaction details.
     * 
     * @returns A promise that resolves with the estimated gas cost.
     */
    gasEstimator(): Promise<any>;

}