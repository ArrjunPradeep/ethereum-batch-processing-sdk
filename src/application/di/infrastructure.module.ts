import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/infrastructure/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/app.env'],
      load: config,
      cache: true, 
      expandVariables: true,
      isGlobal: true,
    }),
  ],
})
export class InfrastructureModule {}
