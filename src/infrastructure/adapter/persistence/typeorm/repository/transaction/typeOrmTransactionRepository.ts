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

        const txnResult = await this.ethereumTransactionService.sendCoin(transaction);

        console.log(":: SEND COIN ::\n", txnResult);

        const txnData: DeepPartial<TypeOrmTransaction> = {
            sender: txnResult.from,
            hash: txnResult.hash,
            gasLimit: txnResult.gasLimit.toString(),
            maxBaseFee: txnResult.maxFeePerGas.toString(),
            priorityFee: txnResult.maxPriorityFeePerGas.toString()
        }

        let txnInfo = await this.transactionRepository.create(txnData);

        await this.entityManager.save(txnInfo);

        return txnData;
    }

    public async sendToken(transaction: Transaction): Promise<any> {
        
        const txnResult = await this.ethereumTransactionService.sendToken(transaction);

        console.log(":: SEND TOKEN ::\n", txnResult);

        const txnData: DeepPartial<TypeOrmTransaction> = {
            sender: txnResult.from,
            hash: txnResult.hash,
            gasLimit: txnResult.gasLimit.toString(),
            maxBaseFee: txnResult.maxFeePerGas.toString(),
            priorityFee: txnResult.maxPriorityFeePerGas.toString()
        }

        let txnInfo = await this.transactionRepository.create(txnData);

        await this.entityManager.save(txnInfo);

        return txnData;
    }

    public async gasEstimator(): Promise<any> {
        return "gasEstimator"
    }

}