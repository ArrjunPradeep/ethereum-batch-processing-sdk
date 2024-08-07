# Blockchain Transaction Service

## Overview

The Blockchain Transaction Service is a `NestJS` application designed to facilitate batch processing of blockchain transactions. It supports sending coins and tokens, as well as retrieving gas estimation data for transactions. The service is built with a `clean architecture` approach, incorporating modules for separation of concerns and scalability.

## Clean Architecture

Clean Architecture is a software design principle aimed at creating systems that are easy to maintain and scale. In this project, Clean Architecture principles are applied to achieve the following:

- **Separation of Concerns**: Each layer of the application is responsible for a distinct part of the system, making it easier to manage and evolve the codebase.
  - **Application Layer**: Contains API controllers and application modules, focusing on handling requests and responses.
  - **Core Layer**: Encapsulates the core business logic and domain models, ensuring that the application's core functionality is independent of external systems.
  - **Infrastructure Layer**: Manages interactions with external systems such as databases and blockchain services, allowing the core and application layers to remain unaffected by changes in infrastructure.

- **Dependency Inversion**: Higher-level modules (such as core business logic) do not depend on lower-level modules (such as infrastructure). Instead, both depend on abstractions (interfaces), which allows for easier testing and modification.

- **Modularity**: The project is organized into well-defined modules, each with a specific responsibility. This modularity enhances readability and maintainability.

- **Scalability**: The structure allows for the easy addition of new features and integration of new technologies without disrupting existing functionality.

For more detailed information on Clean Architecture and its principles, refer to [Robert C. Martin's "Clean Architecture"](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)


## Features

- **`Send Coins`**: Process batch transactions for sending coins.
- **`Send Tokens`**: Handle batch transactions for sending tokens.
- **`Gas Estimation`**: Retrieve gas estimation data for transaction processing.

## Folder Descriptions

### `application`

- **Purpose**: Contains application-specific logic, including API controllers, application modules, and server setup.
- **Subfolders**:
  - `api/http-rest/controller`: Manages HTTP request handling, including request validation and documentation.
    - `documentation/common`: Contains common documentation utilities like `HttpError.ts`.
    - `documentation/transaction`: Contains API body definitions for transaction-related endpoints.
  - `di`: Dependency injection modules that configure and manage dependencies for the application.
    - `infrastructure.module.ts`: Configures infrastructure-related dependencies.
    - `root.module.ts`: Entry point for dependency injection configuration.
    - `transaction.module.ts`: Configures dependencies related to transaction use cases.
  - `server.application.ts`: Entry point for the application server, where the application is initialized and started.

### `core`

- **Purpose**: Contains the core business logic and domain models of the application.
- **Subfolders**:
  - `common/usecase`: Defines common use cases used across the application.
    - `Usecase.ts`: Base class or interface for use cases.
  - `domain/transaction`: Contains transaction-related business logic and domain models.
    - `di/TransactionDITokens.ts`: Dependency injection tokens for transaction-related services.
    - `entity`: Defines domain entities related to transactions.
      - `transaction.entity.ts`: Core transaction entity.
      - `type/createTransactionEntityPayload.ts`: Type definitions for creating transaction entities.
    - `port`: Defines ports (interfaces) for transaction persistence and use cases.
      - `persistence/TransactionRepository.port.ts`: Interface for transaction repository.
      - `usecase`: Interfaces for use cases related to transactions.
        - `gasEstimator.port.ts`: Interface for gas estimation use cases.
        - `sendCoin.port.ts`: Interface for sending coin use cases.
        - `sendToken.port.ts`: Interface for sending token use cases.
    - `usecase`: Contains implementations of use cases.
      - `dto/TransactionUseCase.dto.ts`: Data transfer objects for transaction use cases.
      - `gasEstimator.usecase.ts`: Implementation of the gas estimation use case.
      - `sendCoin.usecase.ts`: Implementation of the send coin use case.
      - `sendToken.usecase.ts`: Implementation of the send token use case.
  - `service/transaction/usecase`: Contains service implementations for transaction-related use cases.
    - `gasEstimator.service.ts`: Service for gas estimation.
    - `sendCoin.service.ts`: Service for sending coins.
    - `sendToken.service.ts`: Service for sending tokens.

### `infrastructure`

- **Purpose**: Contains the implementations for infrastructure concerns such as database access and external services.
- **Subfolders**:
  - `adapter/ethereum`: Contains the implementation of Ethereum-related services.
    - `ethereumTransaction.module.ts`: Module configuration for Ethereum transaction services.
    - `ethereumTransaction.service.ts`: Service for interacting with the Ethereum blockchain.
  - `adapter/persistence/typeorm`: Contains TypeORM-related implementations.
    - `entity/typeOrmTransaction.ts`: TypeORM entity for transactions.
    - `repository/transaction/typeOrmTransactionRepository.ts`: Repository implementation for TypeORM transactions.
    - `usecase/transaction`: Contains adapters that map between use case ports and infrastructure implementations.
      - `gasEstimator.adapter.ts`: Adapter for gas estimation use cases.
      - `sendCoin.adapter.ts`: Adapter for send coin use cases.
      - `sendToken.adapter.ts`: Adapter for send token use cases.
  - `config`: Contains configuration files for various parts of the application.
    - `app.config.ts`: Application configuration settings.
    - `blockchain.config.ts`: Configuration for blockchain-related settings.
    - `database.config.ts`: Configuration for database settings.
    - `index.ts`: Aggregates and exports configuration modules.

### `main.ts`

- **Purpose**: The main entry point of the application where the server is initialized and started.

## Naming Conventions

- **`application`**: Represents the application layer, including controllers, modules, and server configuration.
- **`core`**: Contains the core business logic and domain models. This layer defines the use cases and domain entities.
- **`infrastructure`**: Manages the interaction with external systems and databases, including implementation details for persistence and external services.

## BatchTransfer Smart Contract
This project utilizes the BatchTransfer smart contract, which is responsible for handling batch transactions on the blockchain. The smart contract is implemented in a separate repository and is an integral part of this service.

### Repository Link
BatchTransfer Smart Contract: [BatchTransfer](https://github.com/ArrjunPradeep/batch-transfer-erc20-contract)

### Integration
The BatchTransfer smart contract integrates with the Blockchain Transaction Service to facilitate efficient processing of multiple transactions in a single batch. For detailed information on how to use or deploy the BatchTransfer smart contract, refer to its dedicated repository.

## Installation

### Prerequisites

- `Docker`

### Setup

1. **Pull the Image from `Docker Hub`**
   ```bash
   docker pull arrjunpradeep/sdk:latest
   docker pull postgres:13.15-alpine
   ```

2. **Create a Network**
   ```bash
   docker network create my-network
   ```

3. **Ensure You Have the Required Environment Files**

   Create an `env` folder in the root of your project with the following files:

   * `app.env` : 
   ```bash
   APP_HOST=0.0.0.0
   APP_PORT=3369
   API_SECRET_KEY=safle
   ```

   * `blockchain.env` : 
   ```bash
   NODE_URL=XXXXX
   PRIVATE_KEY=XXXXX
   EXPLORER_API_KEY=XXXXX
   CHAIN_ID=sepolia
   BATCH_CONTRACT=XXXXX
   ```

   * `database.env` : 
   ```bash
   POSTGRES_TYPE=postgres
   POSTGRES_HOST=postgres_db
   POSTGRES_PORT=5432
   POSTGRES_DB=XXXXX
   POSTGRES_USER=XXXXX
   POSTGRES_PASSWORD=XXXXX
   POSTGRES_SYNCHRONIZE=false
   POSTGRES_AUTO_LOAD_ENTITIES=true
   ```
   

4. **Run PostgreSQL Container**
   ```bash
   docker run -d --name postgres_db --network my-network --env-file ./env/database.env -p 5432:5432 postgres:13.15-alpine
   ```

5. **Run Application Container**
   ```bash
   docker run -d --name sdk --network my-network  --env-file ./env/app.env --env-file ./env/blockchain.env -p 3369:3369 arrjunpradeep/sdk:latest
   ```

6. **Check Container Logs**
   ```bash
   docker logs sdk
   docker logs postgres_db
   ```

7. **Access API Documentation**

   To test our SDK, go to http://localhost:3369/swagger for API documentation and testing

   You need to provide the API_SECRET_KEY mentioned in `app.env` for accessing the endpoints through Swagger.

   ![alt text](image.png)

- ***Notes :***

   *****Ensure your .env files (app.env, blockchain.env, and database.env) are correctly configured and located in the ./env directory. The PostgreSQL container should be up and running before the application container to avoid connectivity issues.*****