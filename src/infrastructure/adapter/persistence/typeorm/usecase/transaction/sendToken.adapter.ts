import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { sendTokenPort } from "src/core/domain/transaction/port/usecase/sendToken.port";

@Exclude()
export class sendTokenAdapter implements sendTokenPort {
    privateKey: string;

    @Expose()
    @IsNumber()
    public chainId: number;

    @Expose()
    @IsString()
    public tokenAddress: string;

    @Expose()
    @IsArray()
    public receiverAddress: string[];
    
    @Expose()
    @IsArray()
    public amount: number[];
    
    @Expose()
    @IsString()
    public gasLimit?: string;
   
    @Expose()
    @IsString()
    public maxBaseFee?: string;
   
    @Expose()
    @IsString()
    public priorityFee?: string;

    public static async new(payload: sendTokenPort): Promise<sendTokenAdapter> {
        const adapter: sendTokenAdapter = plainToInstance(sendTokenAdapter, payload);
        return adapter;
    }

}