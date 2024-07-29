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

const persistenceProviders: Provider[] = [
    {
        provide: TransactionDITokens.TransactionRepository,
        useClass: TypeOrmTransactionRepositoryAdapter
    },
    {
        provide: 'EthereumTransactionService',
        useClass: EthereumTransactionService
    }
]

const useCaseProviders: Provider[] = [
    {
        provide: TransactionDITokens.sendCoinUseCase,
        useFactory: (transactionRepository) => new sendCoinService(transactionRepository),
        inject: [TransactionDITokens.TransactionRepository]
    },
    {
        provide: TransactionDITokens.sendTokenUseCase,
        useFactory: (transactionRepository) => new sendTokenService(transactionRepository),
        inject: [TransactionDITokens.TransactionRepository]
    },
    {
        provide: TransactionDITokens.gasEstimatorUseCase,
        useFactory: (transactionRepository) => new gasEstimatorService(transactionRepository),
        inject: [TransactionDITokens.TransactionRepository]
    }
]

@Module({
    imports: [
        TypeOrmModule.forFeature([TypeOrmTransaction])
    ],
    controllers: [
        TransactionController
    ],
    exports: [
        TransactionDITokens.TransactionRepository,
    ],
    providers: [
        ...useCaseProviders,
        ...persistenceProviders
    ]
})

export class TransactionModule {}