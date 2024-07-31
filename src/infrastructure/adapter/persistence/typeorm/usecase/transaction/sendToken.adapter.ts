import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { sendTokenPort } from "src/core/domain/transaction/port/usecase/sendToken.port";

@Exclude()
export class sendTokenAdapter implements sendTokenPort {
    // 1st req.body
    @Expose()
    @IsNumber()
    privateKey: string;

    @Expose()
    @IsString()
    public tokenAddress: string;

    @Expose()
    @IsArray()
    public receiverAddress: string[];
    
    @Expose()
    @IsArray()
    public amount: string[];
    
    @Expose()
    @IsString()
    public gasLimit?: string;
   
    @Expose()
    @IsString()
    public maxFeePerGas?: string;
   
    @Expose()
    @IsString()
    public maxPriorityFeePerGas?: string;

    public static async new(payload: sendTokenPort): Promise<sendTokenAdapter> {
        const adapter: sendTokenAdapter = plainToInstance(sendTokenAdapter, payload);
        return adapter;
    }

}