import { Transaction } from "../../entity/transaction.entity";

export interface TransactionRepositoryPort {

    sendCoin(transaction: Transaction): Promise<any>;

    sendToken(transaction: Transaction): Promise<any>;

    gasEstimator(): Promise<any>;

}