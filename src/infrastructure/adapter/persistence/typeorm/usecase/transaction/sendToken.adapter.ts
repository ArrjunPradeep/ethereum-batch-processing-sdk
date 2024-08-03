import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { sendTokenPort } from "src/core/domain/transaction/port/usecase/sendToken.port";

/**
 * Adapter class for converting send token port data into a TypeScript class instance.
 * 
 * Implements the sendTokenPort interface, transforming and validating token transfer data.
 * Uses class-transformer for transformation and class-validator for validation.
 */
@Exclude()
export class sendTokenAdapter implements sendTokenPort {

    /**
     * The private key for the sender's wallet.
     * Note: Should be a string, but marked as number in the class.
     */
    @Expose()
    @IsNumber()
    privateKey: string;

    /**
     * The address of the token contract to be interacted with.
     */
    @Expose()
    @IsString()
    public tokenAddress: string;

    /**
     * The list of recipient addresses for the token transfer.
     */
    @Expose()
    @IsArray()
    public receiverAddress: string[];
    
    /**
     * The amounts of tokens to be sent to each recipient.
     */
    @Expose()
    @IsArray()
    public amount: string[];
    
    /**
     * The gas limit for the transaction.
     */
    @Expose()
    @IsString()
    public gasLimit?: string;
   
    /**
     * The maximum fee per gas unit.
     */
    @Expose()
    @IsString()
    public maxFeePerGas?: string;
   
    /**
     * The maximum priority fee per gas unit.
     */
    @Expose()
    @IsString()
    public maxPriorityFeePerGas?: string;

    /**
     * Creates a new instance of the sendTokenAdapter with the provided payload.
     * 
     * @param payload - The data to be transformed into the adapter instance.
     * @returns A promise that resolves to a new instance of sendTokenAdapter.
     */
    public static async new(payload: sendTokenPort): Promise<sendTokenAdapter> {
        const adapter: sendTokenAdapter = plainToInstance(sendTokenAdapter, payload);
        return adapter;
    }

}