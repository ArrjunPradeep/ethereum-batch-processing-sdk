import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/infrastructure/config'; // Import configuration file
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM module for database integration
import { EthereumTransactionModule } from 'src/infrastructure/adapter/ethereum/ethereumTransaction.module'; // Import custom Ethereum transaction module

@Global() // This decorator makes the module globally available throughout the application
@Module({
  imports: [
    // Configuration module for environment variables and configuration files
    ConfigModule.forRoot({
      envFilePath: ['env/app.env', 'env/database.env', 'env/blockchain.env'], // Paths to the environment files
      load: config, // Load configuration from the specified file
      cache: true, // Enable caching of the configuration
      expandVariables: true, // Expand environment variables in the configuration
      isGlobal: true, // Make the configuration globally available
    }),
    // TypeORM module configuration for connecting to the database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule to use the configuration
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE.HOST'), // Database host from configuration
        port: configService.getOrThrow<number>('DATABASE.PORT'), // Database port from configuration
        username: configService.getOrThrow<string>('DATABASE.USERNAME'), // Database username from configuration
        password: configService.getOrThrow<string>('DATABASE.PASSWORD'), // Database password from configuration
        database: configService.getOrThrow<string>('DATABASE.NAME'), // Database name from configuration
        autoLoadEntities: configService.getOrThrow<boolean>('DATABASE.AUTO_LOAD_ENTITIES'), // Auto-load entities
        synchronize: configService.getOrThrow<boolean>('DATABASE.SYNCHRONIZE') // Synchronize database schema with entities
      }),
      inject: [ConfigService] // Inject the ConfigService to access configuration values
    }),
    // Import the EthereumTransactionModule, which handles Ethereum-related transactions
    EthereumTransactionModule
  ],
  exports: [
    // Export EthereumTransactionModule to make it available to other modules  
    EthereumTransactionModule
  ]
})

export class InfrastructureModule {}
