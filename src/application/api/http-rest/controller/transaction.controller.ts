import { Body, Controller, Get, Inject, Post, Req } from "@nestjs/common";
import Request from "express";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";
import { gasEstimatorUseCase } from "src/core/domain/transaction/usecase/gasEstimator.usecase";
import { gasEstimatorAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/gasEstimator.adapter";
import { sendCoinAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendCoin.adapter";
import { sendTokenAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendToken.adapter";

@Controller('transaction')
export class TransactionController {

    constructor(
        @Inject(TransactionDITokens.sendCoinUseCase) private readonly sendCoinUseCase: sendCoinUseCase,
        @Inject(TransactionDITokens.sendTokenUseCase) private readonly sendTokenUseCase: sendTokenUseCase,
        @Inject(TransactionDITokens.gasEstimatorUseCase) private readonly gasEstimatorUseCase: gasEstimatorUseCase
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
            data: info
        }

    }

    @Get('SendToken')
    async sendToken(@Body() body, @Req() req: Request) {
        const adapter: sendTokenAdapter = await sendTokenAdapter.new({
            chainId: body.chainId,
            privateKey: body.privateKey,
            tokenAddress: body.tokenAddress,
            receiverAddress: body.receiverAddress,
            amount: body.amount,
            gasLimit: body.gasLimit,
            maxBaseFee: body.maxBaseFee,
            priorityFee: body.priorityFee
        })

        let info = await this.sendTokenUseCase.execute(adapter);

        console.log("98271491798124", adapter);
        
        return {
            data: info
        }   
    }

    @Get('gasEstimator')
    async gasEstimator() {
        const adapter: gasEstimatorAdapter = await gasEstimatorAdapter.new({});

        let info = await  this.gasEstimatorUseCase.execute(adapter);

        console.log("3tuhui2u3tfnq32ijr1r41", info);
        

        return {
            data: info
        }    
    }
}