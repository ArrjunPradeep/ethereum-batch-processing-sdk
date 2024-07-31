import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsString } from "class-validator";
import { gasEstimatorPort } from "src/core/domain/transaction/port/usecase/gasEstimator.port";

@Exclude()
export class gasEstimatorAdapter implements gasEstimatorPort {
    
    @Expose()
    @IsString()
    gasLimit?: string;
   
    @Expose()
    @IsString()
    maxFeePerGas?: string;
   
    @Expose()
    @IsString()
    maxPriorityFeePerGas?: string;

    public static async new(payload: gasEstimatorPort): Promise<gasEstimatorAdapter> {
        const adapter: gasEstimatorAdapter = plainToInstance(gasEstimatorAdapter, payload);
        return adapter;
    }
}