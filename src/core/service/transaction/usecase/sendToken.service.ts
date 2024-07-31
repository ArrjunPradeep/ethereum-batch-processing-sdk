import { Injectable } from "@nestjs/common";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { sendTokenPort } from "src/core/domain/transaction/port/usecase/sendToken.port";
import { TransactionUseCaseDto } from "src/core/domain/transaction/usecase/dto/TransactionUseCase.dto";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";

// sendTokenService implements the `sendTokenUseCase` interface
@Injectable()
export class sendTokenService implements sendTokenUseCase {

    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    public async execute(payload?: sendTokenPort): Promise<TransactionUseCaseDto> {
        const transaction: Transaction = await Transaction.new({
            privateKey: payload.privateKey,
            tokenAddress: payload.tokenAddress,
            receiverAddress: payload.receiverAddress,
            amount: payload.amount,
            gasLimit: payload.gasLimit,
            maxFeePerGas: payload.maxFeePerGas,
            maxPriorityFeePerGas: payload.maxPriorityFeePerGas
        })

        let result = await this.transactionRepository.sendToken(transaction);

        return TransactionUseCaseDto.newFromTransaction(result);
    }

}