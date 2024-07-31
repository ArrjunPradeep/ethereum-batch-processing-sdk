import { Body, Controller, Get, Inject, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import Request from "express";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";
import { gasEstimatorUseCase } from "src/core/domain/transaction/usecase/gasEstimator.usecase";
import { gasEstimatorAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/gasEstimator.adapter";
import { sendCoinAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendCoin.adapter";
import { sendTokenAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendToken.adapter";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpRestApiSendCoinBody } from "./documentation/transaction/HttpRestApiSendCoinBody";
import { HttpRestApiSendTokenBody } from "./documentation/transaction/HttpRestApiSendTokenBody";
import { ErrorDTO } from "./documentation/common/HttpError";

@Controller('transaction')
@ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
})
@ApiResponse({
   status: 404,
   type: ErrorDTO,
   description: 'Not Found',
})
export class TransactionController {

    constructor(
        @Inject(TransactionDITokens.sendCoinUseCase) private readonly sendCoinUseCase: sendCoinUseCase,
        @Inject(TransactionDITokens.sendTokenUseCase) private readonly sendTokenUseCase: sendTokenUseCase,
        @Inject(TransactionDITokens.gasEstimatorUseCase) private readonly gasEstimatorUseCase: gasEstimatorUseCase
    ) {}

    @ApiTags('Batch Transactions')
    @Post('sendCoin')
    @ApiOperation({
        summary: 'Batch Transfer of Native Ethereum Coins',
        description: `This endpoint allows for the transfer of native Ethereum coins (ETH) to multiple recipients in a single transaction. It takes an array of recipient addresses and corresponding amounts, then processes the transfers in one go. 
        
        Note : Please refer to the Schemas mentioned at the end of documentation for better understanding`
    })
    @ApiBody({type: HttpRestApiSendCoinBody})
    // @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: false}))
    async sendCoin(@Body() body: HttpRestApiSendCoinBody, @Req() req: Request) {

        const adapter: sendCoinAdapter = await sendCoinAdapter.new({
            privateKey: body.privateKey,
            receiverAddress: body.receiverAddress,
            amount: body.amount,
            gasLimit: body.gasLimit,
            maxFeePerGas: body.maxFeePerGas,
            maxPriorityFeePerGas: body.maxPriorityFeePerGas
        })

        let info = await this.sendCoinUseCase.execute(adapter);

        console.log("2147138u9502368245", adapter);
        
        return {
            data: info
        }

    }


    @ApiTags('Batch Transactions')
    @Post('SendToken')
    @ApiOperation({
        summary: 'Batch Transfer of ERC20 Tokens',
        description: `Executes a batch transfer of ERC20 tokens to multiple recipients in a single transaction. Ensures efficient and atomic transfers, reducing transaction costs and time.

        Note : Please refer to the Schemas mentioned at the end of documentation for better understanding`
    })
    @ApiBody({type: HttpRestApiSendTokenBody})
    async sendToken(@Body() body, @Req() req: Request) {
        const adapter: sendTokenAdapter = await sendTokenAdapter.new({
            privateKey: body.privateKey,
            tokenAddress: body.tokenAddress,
            receiverAddress: body.receiverAddress,
            amount: body.amount,
            gasLimit: body.gasLimit,
            maxFeePerGas: body.maxFeePerGas,
            maxPriorityFeePerGas: body.maxPriorityFeePerGas
        })

        let info = await this.sendTokenUseCase.execute(adapter);

        console.log("98271491798124", adapter);
        
        return {
            data: info
        }   
    }

    @ApiTags('Gas Metrics')
    @Get('gasEstimator')
    @ApiOperation({
        summary: 'Retrieve Gas Prices and Base Fee',
        description: `Fetches the current gas fees (basefee + maxPriorityFeePerGas) in gwei categorized into low, market, and aggressive, along with the base fee for Ethereum transactions. This endpoint provides essential information for estimating transaction costs and making informed decisions on gas fees.

        Note : Please refer to the Schemas mentioned at the end of documentation for better understanding`

    })
    async gasEstimator() {
        const adapter: gasEstimatorAdapter = await gasEstimatorAdapter.new({});

        let info = await  this.gasEstimatorUseCase.execute(adapter);

        console.log("3tuhui2u3tfnq32ijr1r41", info);
        

        return {
            data: info
        }    
    }
}