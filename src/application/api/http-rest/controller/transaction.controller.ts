import { Body, Controller, Get, Inject, Post, Req } from "@nestjs/common";
import Request from "express";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";
import { sendCoinAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendCoin.adapter";

@Controller('transaction')
export class TransactionController {

    constructor(
        @Inject(TransactionDITokens.sendCoinUseCase) private readonly sendCoinUseCase: sendCoinUseCase,
        @Inject(TransactionDITokens.sendTokenUseCase) private readonly sendTokenUseCase: sendTokenUseCase
    ) {}

    @Get('sendCoin')
    async sendCoin(@Body() body, @Req() req: Request) {

        const adapter: sendCoinAdapter = await sendCoinAdapter.new({
            chainId: body.chainId,
            privateKey: body.privateKey,
            receiverAddress: body.receiverAddress,
            amount: body.amount,
            gasLimit: body.gasLimit,
            maxBaseFee: body.maxBaseFee,
            priorityFee: body.priorityFee
        })

        let info = await this.sendCoinUseCase.execute(adapter);

        console.log("2147138u9502368245", adapter);
        
        return {
            info
        }

    }

    @Get('SendToken')
    async sendToken(@Body() Body, @Req() req: Request) {
        return "SAFLE1"
    }

    @Get('gasEstimator')
    async gasEstimator() {
        return "SAFLE2"
    }
}