import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsString } from "class-validator";
import { gasEstimatorPort } from "src/core/domain/transaction/port/usecase/gasEstimator.port";

/**
 * Adapter class for converting gas estimator port data to a format suitable for use in TypeScript.
 * 
 * Implements the gasEstimatorPort interface to facilitate the transformation and validation
 * of gas estimation data. Uses class-transformer and class-validator for transformation and validation.
 */
@Exclude()
export class gasEstimatorAdapter implements gasEstimatorPort {
    
    /**
     * The gas limit for a transaction.
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
     * Creates a new instance of the gasEstimatorAdapter with the given payload.
     * 
     * @param payload - The data to be transformed into the adapter instance.
     * @returns A promise that resolves to a new instance of gasEstimatorAdapter.
     */
    public static async new(payload: gasEstimatorPort): Promise<gasEstimatorAdapter> {
        const adapter: gasEstimatorAdapter = plainToInstance(gasEstimatorAdapter, payload);
        return adapter;
    }
}