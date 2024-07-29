import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [
    InfrastructureModule,
    TransactionModule
  ],
})
export class RootModule {}
