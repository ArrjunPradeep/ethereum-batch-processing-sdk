import { DeepPartial, Entity, EntityManager, Repository } from "typeorm";
import { TypeOrmTransaction } from "../../entity/typeOrmTransaction";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";
import { EthereumTransactionService } from "src/infrastructure/adapter/ethereum/ethereumTransaction.service";
import { Inject } from "@nestjs/common";

/**
 * Adapter for handling transaction operations using TypeORM.
 * 
 * This repository implements the TransactionRepositoryPort interface, and it interacts with
 * the EthereumTransactionService for executing blockchain transactions and storing transaction
 * details in the database.
 */
@Entity()
export class TypeOrmTransactionRepositoryAdapter extends Repository<TypeOrmTransaction> implements TransactionRepositoryPort {

    private ethereumTransactionService: EthereumTransactionService;

    /**
     * Constructs a new TypeOrmTransactionRepositoryAdapter instance.
     * 
     * @param transactionRepository - The TypeORM repository for TypeOrmTransaction entities.
     * @param entityManager - The TypeORM EntityManager for managing entities.
     * @param ethereumService - The EthereumTransactionService used for blockchain operations.
     */
    constructor(
        @InjectRepository(TypeOrmTransaction)
        private readonly transactionRepository: Repository<TypeOrmTransaction>,
        private readonly entityManager: EntityManager,
        private readonly ethereumService: EthereumTransactionService
    ) {
        super(TypeOrmTransaction, entityManager);
        this.ethereumTransactionService = ethereumService 
    }

    /**
     * Executes a coin transfer transaction using the EthereumTransactionService and stores the result.
     * 
     * @param transaction - The transaction details to be processed.
     * @returns The transaction data including sender, hash, gas details, etc.
     */
    public async sendCoin(transaction: Transaction): Promise<any> {
        // Execute the coin transfer using the EthereumTransactionService.
        const txnResult = await this.ethereumTransactionService.sendCoin(transaction);

        console.log(":: SEND COIN ::\n", txnResult);

        // Prepare the transaction data for database storage.
        const txnData: DeepPartial<TypeOrmTransaction> = {
            sender: txnResult.from,
            hash: txnResult.hash,
            gasLimit: txnResult.gasLimit.toString(),
            maxFeePerGas: txnResult.maxFeePerGas.toString(),
            maxPriorityFeePerGas: txnResult.maxPriorityFeePerGas.toString()
        }

        // Create a new TypeOrmTransaction entity and save it to the database.
        let txnInfo = await this.transactionRepository.create(txnData);
        await this.entityManager.save(txnInfo);

        return txnData;
    }

    /**
     * Executes a token transfer transaction using the EthereumTransactionService and stores the result.
     * 
     * @param transaction - The transaction details to be processed.
     * @returns The transaction data including sender, hash, gas details, etc.
     */
    public async sendToken(transaction: Transaction): Promise<any> {
        // Execute the token transfer using the EthereumTransactionService.
        const txnResult = await this.ethereumTransactionService.sendToken(transaction);

        console.log(":: SEND TOKEN ::\n", txnResult);

        // Prepare the transaction data for database storage.
        const txnData: DeepPartial<TypeOrmTransaction> = {
            sender: txnResult.from,
            hash: txnResult.hash,
            gasLimit: txnResult.gasLimit.toString(),
            maxFeePerGas: txnResult.maxFeePerGas.toString(),
            maxPriorityFeePerGas: txnResult.maxPriorityFeePerGas.toString()
        }

        // Create a new TypeOrmTransaction entity and save it to the database.
        let txnInfo = await this.transactionRepository.create(txnData);
        await this.entityManager.save(txnInfo);

        return txnData;
    }

    /**
     * Retrieves gas price estimates from the EthereumTransactionService.
     * 
     * @returns An object containing various gas price estimates.
     */
    public async gasEstimator(): Promise<any> {

        const gasEstimatorResult = this.ethereumService.gasEstimator();

        return gasEstimatorResult;
    }

}