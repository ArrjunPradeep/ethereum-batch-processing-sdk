// Importing necessary decorators and types from NestJS and the domain layer.
import { Injectable } from "@nestjs/common";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { sendCoinPort } from "src/core/domain/transaction/port/usecase/sendCoin.port";
import { TransactionUseCaseDto } from "src/core/domain/transaction/usecase/dto/TransactionUseCase.dto";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";

// The `sendCoinService` class implements the `sendCoinUseCase` interface.
// It provides the concrete logic for sending coins as part of the use case.
@Injectable()
export class sendCoinService implements sendCoinUseCase {

    // Constructor injection of the TransactionRepositoryPort.
    // This allows the service to interact with the repository to send coins.
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    /**
     * Executes the send coin use case.
     * 
     * This method creates a `Transaction` instance from the provided input,
     * interacts with the repository to send the coin, and then returns the
     * result formatted as a `TransactionUseCaseDto`.
     * 
     * @param payload - The data required for sending coins, including private key,
     *                   receiver addresses, amounts, and optional gas parameters.
     * @returns A promise that resolves to a `TransactionUseCaseDto` containing the
     *          result of the coin sending operation.
     */
    public async execute(payload?: sendCoinPort): Promise<TransactionUseCaseDto> {
        // Creating a new instance of the `Transaction` class with the provided input.        
        const transaction: Transaction = await Transaction.new({
            privateKey : payload.privateKey,
            receiverAddress : payload.receiverAddress,
            amount : payload.amount,
            gasLimit : payload.gasLimit,
            maxFeePerGas : payload.maxFeePerGas,
            maxPriorityFeePerGas : payload.maxPriorityFeePerGas
        })

        // Interacting with the repository to send the coin.
        // The `sendCoin` method of the repository handles the transaction.
        let result = await this.transactionRepository.sendCoin(transaction);

        // Creating a `TransactionUseCaseDto` instance with the result of the send coin operation.
        // The `newFromTransaction` method formats the result according to the DTO.
        return TransactionUseCaseDto.newFromTransaction(result);
    }
}