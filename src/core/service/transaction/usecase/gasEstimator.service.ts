// Importing necessary decorators and types from NestJS and the domain layer.
import { Injectable } from "@nestjs/common";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { gasEstimatorPort } from "src/core/domain/transaction/port/usecase/gasEstimator.port";
import { TransactionUseCaseDto } from "src/core/domain/transaction/usecase/dto/TransactionUseCase.dto";
import { gasEstimatorUseCase } from "src/core/domain/transaction/usecase/gasEstimator.usecase";

// The `gasEstimatorService` class implements the `gasEstimatorUseCase` interface.
// It provides the concrete logic for estimating gas.
@Injectable()
export class gasEstimatorService implements gasEstimatorUseCase {

    // Constructor injection of the TransactionRepositoryPort.
    // This allows the service to interact with the repository for gas estimation.
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    /**
     * Executes the gas estimation use case.
     * 
     * This method interacts with the repository to perform gas estimation for a transaction.
     * It then returns the result formatted as a TransactionUseCaseDto.
     * 
     * @param port - The data required for gas estimation (not used in this implementation).
     * @returns A promise that resolves to a TransactionUseCaseDto containing the gas estimation result.
     */
    public async execute(port?: gasEstimatorPort): Promise<TransactionUseCaseDto> {
        
        // Interacting with the repository to get the gas estimation result.
        // The `gasEstimator` method of the repository is expected to return the result.
        let result = await this.transactionRepository.gasEstimator();

        // Creating a TransactionUseCaseDto instance with the gas estimation result.
        // The `newFromTransaction` method formats the result according to the DTO.
        return TransactionUseCaseDto.newFromTransaction(result);
    }

}