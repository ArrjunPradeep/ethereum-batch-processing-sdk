import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/infrastructure/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumTransactionModule } from 'src/infrastructure/adapter/ethereum/ethereumTransaction.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/app.env', 'env/database.env', 'env/blockchain.env'],
      load: config,
      cache: true, 
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE.HOST'),
        port: configService.getOrThrow<number>('DATABASE.PORT'),
        username: configService.getOrThrow<string>('DATABASE.USERNAME'),
        password: configService.getOrThrow<string>('DATABASE.PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE.NAME'),
        autoLoadEntities: configService.getOrThrow<boolean>('DATABASE.AUTO_LOAD_ENTITIES'),
        synchronize: configService.getOrThrow<boolean>('DATABASE.SYNCHRONIZE')
      }),
      inject: [ConfigService]
    }),
    EthereumTransactionModule
  ],
  exports: [EthereumTransactionModule]
})

export class InfrastructureModule {}
