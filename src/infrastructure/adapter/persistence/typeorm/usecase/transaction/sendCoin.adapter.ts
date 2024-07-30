import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { sendCoinPort } from "src/core/domain/transaction/port/usecase/sendCoin.port";

@Exclude()
export class sendCoinAdapter implements sendCoinPort  {
    @Expose()
    @IsString()
    privateKey: string;

    @Expose()
    @IsNumber()
    public chainId: number;

    @Expose()
    @IsArray()
    receiverAddress: string[];
    
    @Expose()
    @IsArray()
    amount: string[];
    
    @Expose()
    @IsString()
    gasLimit?: string;
   
    @Expose()
    @IsString()
    maxBaseFee?: string;
   
    @Expose()
    @IsString()
    priorityFee?: string;

    public static async new(payload: sendCoinPort): Promise<sendCoinAdapter> {
        const adapter: sendCoinAdapter = plainToInstance(sendCoinAdapter, payload);
        return adapter;
    }

}