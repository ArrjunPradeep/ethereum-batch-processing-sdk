import { Transaction } from "../../entity/transaction.entity";
import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class TransactionUseCaseDto {

    @Expose()
    public chainId: number;

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
    public maxBaseFee?: string;

    @Expose()
    public priorityFee?: string;

    public static newFromTransaction(transaction: Transaction): TransactionUseCaseDto {
        return plainToInstance(TransactionUseCaseDto, transaction);
    }

}