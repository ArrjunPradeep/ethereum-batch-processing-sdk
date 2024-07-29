import { Body, Controller, Get, Inject, Post, Req } from "@nestjs/common";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";

@Controller('transaction')
export class TransactionController {

    constructor(
        @Inject(TransactionDITokens.sendCoinUseCase) private readonly sendCoinUseCase: sendCoinUseCase,
        @Inject(TransactionDITokens.sendTokenUseCase) private readonly sendTokenUseCase: sendTokenUseCase
    ) {}

    @Get('sendCoin')
    async sendCoin(@Body() Body, @Req() req: Request) {
        return "SAFLE"
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