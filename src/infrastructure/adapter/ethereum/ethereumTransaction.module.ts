import { Module } from "@nestjs/common";
import { EthereumTransactionService } from "./ethereumTransaction.service";

@Module({
    providers: [EthereumTransactionService],
    exports: [EthereumTransactionService]
})

export class EthereumTransactionModule {}