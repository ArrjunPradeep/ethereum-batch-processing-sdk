// Importing the generic UseCase interface, which defines the contract for all use cases in the application.
import { UseCase } from "src/core/common/usecase/Usecase";

// Importing the sendTokenPort interface, which specifies the structure of the input data required for sending tokens.
import { sendTokenPort } from "../port/usecase/sendToken.port";

// Importing the TransactionUseCaseDto class, which represents the data format for the output of the token sending use case.
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

/**
 * The sendTokenUseCase interface defines the contract for the use case responsible for sending tokens.
 * 
 * It extends the generic UseCase interface to specify the input and output types for this use case.
 * 
 * Input Type: sendTokenPort
 * - This interface outlines the structure of the input data needed to perform the token sending operation.
 * 
 * Output Type: TransactionUseCaseDto
 * - This DTO specifies the structure and format of the result returned after sending tokens.
 * 
 * By extending the UseCase interface, sendTokenUseCase ensures that any implementation will follow this contract,
 * maintaining consistency and type safety in the handling of token transactions.
 */
export interface sendTokenUseCase extends UseCase<sendTokenPort, TransactionUseCaseDto> {}