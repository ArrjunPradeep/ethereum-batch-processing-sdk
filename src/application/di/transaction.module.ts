import { Module, Provider } from "@nestjs/common";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { gasEstimatorService } from "src/core/service/transaction/usecase/gasEstimator.service";
import { sendCoinService } from "src/core/service/transaction/usecase/sendCoin.service";
import { sendTokenService } from "src/core/service/transaction/usecase/sendToken.service";
import { TransactionController } from "../api/http-rest/controller/transaction.controller";
import { TypeOrmTransactionRepositoryAdapter } from "src/infrastructure/adapter/persistence/typeorm/repository/transaction/typeOrmTransactionRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmTransaction } from "src/infrastructure/adapter/persistence/typeorm/entity/typeOrmTransaction";
import { EthereumTransactionService } from "src/infrastructure/adapter/ethereum/ethereumTransaction.service";
import { InfrastructureModule } from "./infrastructure.module";

// Providers for persistence layer
const persistenceProviders: Provider[] = [
    {
        provide: TransactionDITokens.TransactionRepository, // Token for Transaction Repository
        useClass: TypeOrmTransactionRepositoryAdapter  // Use the TypeORM repository adapter for the implementation
    },
    {
        provide: 'EthereumTransactionService', // Token for Ethereum Transaction Service
        useClass: EthereumTransactionService // Use the Ethereum transaction service for the implementation
    }
]

// Providers for use cases
const useCaseProviders: Provider[] = [
    {
        provide: TransactionDITokens.sendCoinUseCase, // Token for Send Coin Use Case
        useFactory: (transactionRepository) => new sendCoinService(transactionRepository), // Factory function to create the sendCoinService
        inject: [TransactionDITokens.TransactionRepository] // Inject Transaction Repository
    },
    {
        provide: TransactionDITokens.sendTokenUseCase, // Token for Send Token Use Case
        useFactory: (transactionRepository) => new sendTokenService(transactionRepository), // Factory function to create the sendTokenService
        inject: [TransactionDITokens.TransactionRepository] // Inject Transaction Repository
    },
    {
        provide: TransactionDITokens.gasEstimatorUseCase, // Token for Gas Estimator Use Case
        useFactory: (transactionRepository) => new gasEstimatorService(transactionRepository), // Factory function to create the gasEstimatorService
        inject: [TransactionDITokens.TransactionRepository] // Inject Transaction Repository
    }
]

@Module({
    imports: [
        InfrastructureModule, // Import the Infrastructure module to use its providers
        TypeOrmModule.forFeature([TypeOrmTransaction]), // Register TypeOrmTransaction entity with TypeORM
    ],
    controllers: [
        TransactionController // Register the TransactionController
    ],
    exports: [
        TransactionDITokens.TransactionRepository, // Export the Transaction Repository token for use in other modules
    ],
    providers: [
        ...useCaseProviders, // Register use case providers
        ...persistenceProviders // Register persistence providers
    ]
})

export class TransactionModule {}