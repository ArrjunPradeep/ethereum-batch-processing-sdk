import { BadRequestException, Body, Controller, Get, Inject, InternalServerErrorException, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import Request from "express";
import { TransactionDITokens } from "src/core/domain/transaction/di/TransactionDITokens";
import { sendCoinUseCase } from "src/core/domain/transaction/usecase/sendCoin.usecase";
import { sendTokenUseCase } from "src/core/domain/transaction/usecase/sendToken.usecase";
import { gasEstimatorUseCase } from "src/core/domain/transaction/usecase/gasEstimator.usecase";
import { gasEstimatorAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/gasEstimator.adapter";
import { sendCoinAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendCoin.adapter";
import { sendTokenAdapter } from "src/infrastructure/adapter/persistence/typeorm/usecase/transaction/sendToken.adapter";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpRestApiSendCoinBody } from "./documentation/transaction/HttpRestApiSendCoinBody";
import { HttpRestApiSendTokenBody } from "./documentation/transaction/HttpRestApiSendTokenBody";
import { ErrorDTO } from "./documentation/common/HttpError";
import { ApiKeyGuard } from "../transaction/guards/transaction.guard";

/**
 * TransactionController handles the HTTP requests for transaction operations.
 * It interacts with the use cases to perform business logic and return responses.
 */
@UseGuards(ApiKeyGuard) // Applies the ApiKeyGuard to protect the endpoints
@ApiBearerAuth('API_KEY') // Specifies that API_KEY is required for authentication
@Controller('transaction') // Defines the base route for this controller
@ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error', // General error response
})
@ApiResponse({
    status: 404,
    type: ErrorDTO,
    description: 'Not Found', // Error response for non-existing routes
})
export class TransactionController {

    /**
     * Constructs a TransactionController instance.
     * @param sendCoinUseCase - Use case for sending coins
     * @param sendTokenUseCase - Use case for sending tokens
     * @param gasEstimatorUseCase - Use case for estimating gas
     */
    constructor(
        @Inject(TransactionDITokens.sendCoinUseCase) private readonly sendCoinUseCase: sendCoinUseCase,
        @Inject(TransactionDITokens.sendTokenUseCase) private readonly sendTokenUseCase: sendTokenUseCase,
        @Inject(TransactionDITokens.gasEstimatorUseCase) private readonly gasEstimatorUseCase: gasEstimatorUseCase
    ) { }

    /**
     * Endpoint to batch transfer native Ethereum coins.
     * @param body - Request body containing transaction details
     * @param req - HTTP request object
     * @returns Transaction details or error response
     */
    @ApiTags('Batch Transactions') // Swagger tag for grouping
    @Post('sendCoin') // HTTP POST route for sending coins
    @ApiOperation({
        summary: 'Batch Transfer of Native Ethereum Coins',
        description: `This endpoint allows for the transfer of native Ethereum coins (ETH) to multiple recipients in a single transaction. It takes an array of recipient addresses and corresponding amounts, then processes the transfers in one go. 
        
        Note : Please refer to the Schemas mentioned at the end of documentation for better understanding`
    })
    @ApiBody({ type: HttpRestApiSendCoinBody }) // Swagger documentation for request body
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // Validates and sanitizes input
    async sendCoin(@Body() body: HttpRestApiSendCoinBody, @Req() req: Request) {

        try {
            // Create an adapter for the sendCoin use case from the request body
            const adapter: sendCoinAdapter = await sendCoinAdapter.new({
                privateKey: body.privateKey,
                receiverAddress: body.receiverAddress,
                amount: body.amount,
                gasLimit: body.gasLimit,
                maxFeePerGas: body.maxFeePerGas,
                maxPriorityFeePerGas: body.maxPriorityFeePerGas
            })

            // Execute the sendCoin use case with the adapter
            let info = await this.sendCoinUseCase.execute(adapter);

            console.log(":: adapter-send-coin :: ", adapter);

            // Return the transaction details
            return {
                data: info
            }
        } catch (error) {
            console.error('Transaction Error:', error.message); // Log error details
            // Handle different types of errors and throw appropriate exceptions
            if (error.message.includes('insufficient funds')) {
                throw new BadRequestException('Insufficient funds for the transaction.');
            } else if (error.message.includes('bad address')) {
                throw new BadRequestException('Invalid Address');
            } else {
                throw new InternalServerErrorException('Transaction Error');
            }
        }

    }

    /**
     * Endpoint to batch transfer ERC20 tokens.
     * @param body - Request body containing transaction details
     * @param req - HTTP request object
     * @returns Transaction details or error response
     */
    @ApiTags('Batch Transactions') // Swagger tag for grouping
    @Post('SendToken') // HTTP POST route for sending tokens
    @ApiOperation({
        summary: 'Batch Transfer of ERC20 Tokens',
        description: `Executes a batch transfer of ERC20 tokens to multiple recipients in a single transaction. Ensures efficient and atomic transfers, reducing transaction costs and time.

        Note : Please refer to the Schemas mentioned at the end of documentation for better understanding`
    })
    @ApiBody({ type: HttpRestApiSendTokenBody }) // Swagger documentation for request body
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // Validates and sanitizes input
    async sendToken(@Body() body: HttpRestApiSendTokenBody, @Req() req: Request) {

        try {
            // Create an adapter for the sendToken use case from the request body
            const adapter: sendTokenAdapter = await sendTokenAdapter.new({
                privateKey: body.privateKey,
                tokenAddress: body.tokenAddress,
                receiverAddress: body.receiverAddress,
                amount: body.amount,
                gasLimit: body.gasLimit,
                maxFeePerGas: body.maxFeePerGas,
                maxPriorityFeePerGas: body.maxPriorityFeePerGas
            })

            // Execute the sendToken use case with the adapter
            let info = await this.sendTokenUseCase.execute(adapter);

            console.log("adapter-send-token", adapter);

            // Return the transaction details
            return {
                data: info
            }
        } catch (error) {
            console.error('Transaction Error:', error); // Log error details
            // Handle different types of errors and throw appropriate exceptions
            if (error.message.includes('insufficient funds')) {
                throw new BadRequestException('Insufficient funds for the transaction.');
            } else if (error.message.includes('bad address')) {
                throw new BadRequestException('Invalid Address');
            } else {
                throw new InternalServerErrorException('Transaction Error');
            }
        }

    }

    /**
     * Endpoint to retrieve current gas fees and base fee.
     * @returns Gas pricing information or error response
     */
    @ApiTags('Gas Metrics') // Swagger tag for grouping
    @Get('gasEstimator') // HTTP GET route for gas estimation
    @ApiOperation({
        summary: 'Retrieve Gas Prices and Base Fee',
        description: `Fetches the current gas fees (basefee + maxPriorityFeePerGas) in gwei categorized into low, market, and aggressive, along with the base fee for Ethereum transactions. This endpoint provides essential information for estimating transaction costs and making informed decisions on gas fees.

        Note : Please refer to the Schemas mentioned at the end of documentation for better understanding`

    })
    async gasEstimator() {
        try {
            // Create an adapter for the gasEstimator use case
            const adapter: gasEstimatorAdapter = await gasEstimatorAdapter.new({});

            // Execute the gasEstimator use case with the adapter
            let info = await this.gasEstimatorUseCase.execute(adapter);

            console.log("adapter-gas-estimator", info);
           
            // Return gas pricing information
            return {
                data: info
            }
        } catch (error) {
            console.error('Transaction Error:', error.message); // Log error details
            // Handle different types of errors and throw appropriate exceptions
            if (error.message.includes('insufficient funds')) {
                throw new BadRequestException('Insufficient funds for the transaction.');
            } else if (error.message.includes('bad address')) {
                throw new BadRequestException('Invalid Address');
            } else {
                throw new InternalServerErrorException('Transaction Error');
            }
        }
    }
}