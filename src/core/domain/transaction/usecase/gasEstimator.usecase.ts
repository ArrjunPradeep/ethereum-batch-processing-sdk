// Importing the generic UseCase interface which defines the contract for use cases.
import { UseCase } from "src/core/common/usecase/Usecase";

// Importing the gasEstimatorPort interface which defines the structure of input required for gas estimation.
import { gasEstimatorPort } from "../port/usecase/gasEstimator.port";

// Importing the TransactionUseCaseDto class which represents the output of the gas estimation process.
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

/**
 * The gasEstimatorUseCase interface defines the contract for the gas estimation use case.
 * 
 * It extends the generic UseCase interface to specify the input and output types for the gas estimation process.
 * 
 * Input Type: gasEstimatorPort
 * - This interface outlines the data required to perform gas estimation.
 * 
 * Output Type: TransactionUseCaseDto
 * - This DTO defines the structure and format of the result returned by the gas estimation process.
 * 
 * By extending the UseCase interface, gasEstimatorUseCase ensures that any implementation will adhere to this contract,
 * guaranteeing consistency and type safety.
 */
export interface gasEstimatorUseCase extends UseCase<gasEstimatorPort, TransactionUseCaseDto> {}