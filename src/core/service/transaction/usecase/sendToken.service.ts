// Importing necessary decorators and types from NestJS and the domain layer.
import { Injectable } from "@nestjs/common";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { sendTokenPort } from "src/core/domain/transaction/port/usecase/sendToken.port";
import { TransactionUseCaseDto } from "src/core/domain/transaction/usecase/dto/TransactionUseCase.dto";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";

// The `sendTokenService` class implements the `sendTokenUseCase` interface.
// It provides the concrete logic for sending tokens as part of the use case.
@Injectable()
export class sendTokenService implements sendTokenUseCase {

    // Constructor injection of the TransactionRepositoryPort.
    // This allows the service to interact with the repository to send tokens.
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    /**
     * Executes the send token use case.
     * 
     * This method creates a `Transaction` instance from the provided input,
     * interacts with the repository to send the token, and then returns the
     * result formatted as a `TransactionUseCaseDto`.
     * 
     * @param payload - The data required for sending tokens, including private key,
     *                   token address, receiver addresses, amounts, and optional gas parameters.
     * @returns A promise that resolves to a `TransactionUseCaseDto` containing the
     *          result of the token sending operation.
     */
    public async execute(payload?: sendTokenPort): Promise<TransactionUseCaseDto> {
        // Creating a new instance of the `Transaction` class with the provided input.
        const transaction: Transaction = await Transaction.new({
            privateKey: payload.privateKey,
            tokenAddress: payload.tokenAddress,
            receiverAddress: payload.receiverAddress,
            amount: payload.amount,
            gasLimit: payload.gasLimit,
            maxFeePerGas: payload.maxFeePerGas,
            maxPriorityFeePerGas: payload.maxPriorityFeePerGas
        })

        // Interacting with the repository to send the token.
        // The `sendToken` method of the repository handles the transaction.
        let result = await this.transactionRepository.sendToken(transaction);

        // Creating a `TransactionUseCaseDto` instance with the result of the send token operation.
        // The `newFromTransaction` method formats the result according to the DTO.
        return TransactionUseCaseDto.newFromTransaction(result);
    }

}