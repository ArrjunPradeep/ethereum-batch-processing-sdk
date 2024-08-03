import { Transaction } from "../../entity/transaction.entity";
import { Exclude, Expose, plainToInstance } from "class-transformer";

/**
 * Data Transfer Object (DTO) for handling transaction use cases.
 * 
 * This class defines the structure of the data that will be used to transfer information between different
 * layers of the application. It uses the `class-transformer` library to control the transformation and
 * serialization of the data.
 */
@Exclude()
export class TransactionUseCaseDto {

    /**
     * Address of the sender initiating the transaction.
     * 
     * @type {string}
     */
    @Expose()
    public sender: string

    /**
     * Hash of the transaction.
     * 
     * @type {string}
     */
    @Expose()
    public hash: string


    /**
     * Address of the ERC-20 token involved in the transaction (optional).
     * 
     * @type {string}
     */
    @Expose()
    public tokenAddress?: string;

    /**
     * Array of recipient addresses for the transaction.
     * 
     * @type {string[]}
     */
    @Expose()
    public receiverAddress: string[];


    /**
     * Array of amounts corresponding to each recipient address.
     * 
     * @type {number[]}
     */
    @Expose()
    public amount: number[];


    /**
     * Optional gas limit for the transaction.
     * 
     * @type {string}
     */
    @Expose()
    public gasLimit?: string;


    /**
     * Optional maximum fee per gas unit.
     * 
     * @type {string}
     */
    @Expose()
    public maxFeePerGas?: string;

    /**
     * Optional maximum priority fee per gas unit.
     * 
     * @type {string}
     */
    @Expose()
    public maxPriorityFeePerGas?: string;


    /**
     * Maximum fee per gas unit for low fee estimation.
     * 
     * @type {string}
     */
    @Expose()
    public lowMaxFeePerGas: string;

    /**
     * Maximum fee per gas unit for market fee estimation.
     * 
     * @type {string}
     */
    @Expose()
    public marketMaxFeePerGas: string;


   /**
     * Maximum fee per gas unit for aggressive fee estimation.
     * 
     * @type {string}
     */
    @Expose()
    public aggressiveMaxFeePerGas: string;


    /**
     * Base fee for the transaction.
     * 
     * @type {string}
     */
    @Expose()
    public baseFee: string;

    /**
     * Static method to create an instance of TransactionUseCaseDto from a Transaction entity.
     * 
     * @param transaction - The Transaction entity to be converted into DTO.
     * @returns An instance of TransactionUseCaseDto.
     */
    public static newFromTransaction(transaction: Transaction): TransactionUseCaseDto {
        // Converts a Transaction entity into a TransactionUseCaseDto instance using class-transformer.
        return plainToInstance(TransactionUseCaseDto, transaction);
    }

}