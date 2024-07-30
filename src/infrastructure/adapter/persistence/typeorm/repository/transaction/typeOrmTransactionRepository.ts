import { DeepPartial, Entity, EntityManager, Repository } from "typeorm";
import { TypeOrmTransaction } from "../../entity/typeOrmTransaction";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";
import { EthereumTransactionService } from "src/infrastructure/adapter/ethereum/ethereumTransaction.service";
import { Inject } from "@nestjs/common";

@Entity()
export class TypeOrmTransactionRepositoryAdapter extends Repository<TypeOrmTransaction> implements TransactionRepositoryPort {

    private ethereumTransactionService: EthereumTransactionService;

    constructor(
        @InjectRepository(TypeOrmTransaction)
        private readonly transactionRepository: Repository<TypeOrmTransaction>,
        private readonly entityManager: EntityManager,
        private readonly ethereumService: EthereumTransactionService
    ) {
        super(TypeOrmTransaction, entityManager);
        this.ethereumTransactionService = ethereumService 
    }

    public async sendCoin(transaction: Transaction): Promise<any> {

        this.ethereumTransactionService.sendCoin(transaction);

        return "sendCoin"
    }

    public async sendToken(transaction: Transaction): Promise<any> {
        return "sendToken"
    }

    public async gasEstimator(): Promise<any> {
        return "gasEstimator"
    }

}