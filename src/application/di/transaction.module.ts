import { Module, Provider } from "@nestjs/common";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { gasEstimatorService } from "src/core/service/transaction/usecase/gasEstimator.service";
import { sendCoinService } from "src/core/service/transaction/usecase/sendCoin.service";
import { sendTokenService } from "src/core/service/transaction/usecase/sendToken.service";

const persistenceProviders: Provider[] = []

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
    imports: [],
    controllers: [],
    exports: [
        TransactionDITokens.TransactionRepository
    ],
    providers: [
        ...useCaseProviders
    ]
})

export class TransactionModule {}