import { Injectable } from "@nestjs/common";
import { Transaction } from "src/core/domain/transaction/entity/transaction.entity";
import { TransactionRepositoryPort } from "src/core/domain/transaction/port/persistence/TransactionRepository.port";
import { sendCoinPort } from "src/core/domain/transaction/port/usecase/sendCoin.port";
import { TransactionUseCaseDto } from "src/core/domain/transaction/usecase/dto/TransactionUseCase.dto";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";

// sendCoinService implements the `sendCoinUseCase` interface
@Injectable()
export class sendCoinService implements sendCoinUseCase {

    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    public async execute(payload?: sendCoinPort): Promise<TransactionUseCaseDto> {
        const transaction: Transaction = await Transaction.new({
            chainId : payload.chainId,
            privateKey : payload.privateKey,
            receiverAddress : payload.receiverAddress,
            amount : payload.amount,
            gasLimit : payload.gasLimit,
            maxBaseFee : payload.maxBaseFee,
            priorityFee : payload.priorityFee
        })

        let result = await this.transactionRepository.sendCoin(transaction);

        return TransactionUseCaseDto.newFromTransaction(result);
    }
}