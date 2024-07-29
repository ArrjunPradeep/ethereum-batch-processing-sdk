import { Injectable } from "@nestjs/common";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { gasEstimatorPort } from "src/core/domain/transaction/port/usecase/gasEstimator.port";
import { TransactionUseCaseDto } from "src/core/domain/transaction/usecase/dto/TransactionUseCase.dto";
import { gasEstimatorUseCase } from "src/core/domain/transaction/usecase/gasEstimator.usecase";

// gasEstimatorService implements the `gasEstimatorUseCase` interface
@Injectable()
export class gasEstimatorService implements gasEstimatorUseCase {

    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    public async execute(port?: gasEstimatorPort): Promise<TransactionUseCaseDto> {
        let result = await this.transactionRepository.gasEstimator();

        return TransactionUseCaseDto.newFromTransaction(result);
    }

}