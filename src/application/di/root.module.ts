import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';

@Module({
  imports: [InfrastructureModule],
})
export class RootModule {}
