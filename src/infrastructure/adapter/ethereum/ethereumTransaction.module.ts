import { Module } from "@nestjs/common";
import { EthereumTransactionService } from "./ethereumTransaction.service";

/**
 * Module for managing Ethereum transaction-related functionality.
 * 
 * @module EthereumTransactionModule
 * 
 * @description
 * This module provides and exports the `EthereumTransactionService`, which handles Ethereum transaction operations.
 */
@Module({
    providers: [
        // Provide the EthereumTransactionService for dependency injection
        EthereumTransactionService
    ],
    exports: [
        // Export the EthereumTransactionService so it can be used in other modules
        EthereumTransactionService
    ]
})

export class EthereumTransactionModule {}