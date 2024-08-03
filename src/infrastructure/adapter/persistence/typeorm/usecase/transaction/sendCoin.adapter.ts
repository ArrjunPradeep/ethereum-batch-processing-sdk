import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { sendCoinPort } from "src/core/domain/transaction/port/usecase/sendCoin.port";

/**
 * Adapter class for converting send coin port data into a TypeScript class instance.
 * 
 * Implements the sendCoinPort interface, transforming and validating coin transfer data.
 * Uses class-transformer for transformation and class-validator for validation.
 */
@Exclude()
export class sendCoinAdapter implements sendCoinPort  {

    /**
     * The private key for the sender's wallet.
     */
    @Expose()
    @IsString()
    privateKey: string;

    /**
     * The list of recipient addresses for the coin transfer.
     */
    @Expose()
    @IsArray()
    receiverAddress: string[];
    
    /**
     * The amounts of coins to be sent to each recipient.
     */
    @Expose()
    @IsArray()
    amount: string[];
    
    /**
     * The gas limit for the transaction.
     */
    @Expose()
    @IsString()
    gasLimit?: string;
   
    /**
     * The maximum fee per gas unit.
     */
    @Expose()
    @IsString()
    maxFeePerGas?: string;
   
    /**
     * The maximum priority fee per gas unit.
     */
    @Expose()
    @IsString()
    maxPriorityFeePerGas?: string;

    /**
     * Creates a new instance of the sendCoinAdapter with the provided payload.
     * 
     * @param payload - The data to be transformed into the adapter instance.
     * @returns A promise that resolves to a new instance of sendCoinAdapter.
     */
    public static async new(payload: sendCoinPort): Promise<sendCoinAdapter> {
        const adapter: sendCoinAdapter = plainToInstance(sendCoinAdapter, payload);
        return adapter;
    }

}