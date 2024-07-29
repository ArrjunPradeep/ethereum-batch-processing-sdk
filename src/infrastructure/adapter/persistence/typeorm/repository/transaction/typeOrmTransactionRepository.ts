import { Entity, EntityManager, Repository } from "typeorm";
import { TypeOrmTransaction } from "../../entity/typeOrmTransaction";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";

@Entity()
export class TypeOrmTransactionRepositoryAdapter extends Repository<TypeOrmTransaction> implements TransactionRepositoryPort {

    constructor(
        @InjectRepository(TypeOrmTransaction)
        private readonly transactionRepository: Repository<TypeOrmTransaction>,
        private readonly entityManager: EntityManager
    ) {
        super(TypeOrmTransaction, entityManager)
    }

    public async sendCoin(transaction: Transaction): Promise<any> {
        return "sendCoin"
    }

    public async sendToken(transaction: Transaction): Promise<any> {
        return "sendToken"
    }

    public async gasEstimator(): Promise<any> {
        return "gasEstimator"
    }

}