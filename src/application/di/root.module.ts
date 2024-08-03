import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module'; // Import the infrastructure module
import { TransactionModule } from './transaction.module'; // Import the transaction module

@Module({
  imports: [
    InfrastructureModule, // Import the InfrastructureModule for global configurations and services
    TransactionModule // Import the TransactionModule for handling transaction-related logic
  ],
})
export class RootModule {}
