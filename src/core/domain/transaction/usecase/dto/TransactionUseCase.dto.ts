import { Transaction } from "../../entity/transaction.entity";
import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class TransactionUseCaseDto {

    @Expose()
    public sender: string

    @Expose()
    public hash: string

    @Expose()
    public tokenAddress?: string;

    @Expose()
    public receiverAddress: string[];

    @Expose()
    public amount: number[];

    @Expose()
    public gasLimit?: string;

    @Expose()
    public maxFeePerGas?: string;

    @Expose()
    public maxPriorityFeePerGas?: string;

    @Expose()
    public lowMaxFeePerGas: string;

    @Expose()
    public marketMaxFeePerGas: string;

    @Expose()
    public aggressiveMaxFeePerGas: string;

    @Expose()
    public baseFee: string;


    public static newFromTransaction(transaction: Transaction): TransactionUseCaseDto {
        return plainToInstance(TransactionUseCaseDto, transaction);
    }

}