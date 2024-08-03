// Importing the generic UseCase interface which defines the contract for all use cases.
import { UseCase } from "src/core/common/usecase/Usecase";

// Importing the sendCoinPort interface which specifies the structure of input data required for sending coins.
import { sendCoinPort } from "../port/usecase/sendCoin.port";

// Importing the TransactionUseCaseDto class which represents the output data format for the send coin use case.
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

/**
 * The sendCoinUseCase interface defines the contract for the use case responsible for sending coins.
 * 
 * It extends the generic UseCase interface to specify the input and output types for this use case.
 * 
 * Input Type: sendCoinPort
 * - This interface outlines the data structure required to perform the coin sending operation.
 * 
 * Output Type: TransactionUseCaseDto
 * - This DTO defines the structure and format of the result returned after sending the coins.
 * 
 * By extending the UseCase interface, sendCoinUseCase ensures that any implementation of this use case
 * will adhere to this contract, ensuring consistency and type safety in the handling of coin transactions.
 */
export interface sendCoinUseCase extends UseCase<sendCoinPort, TransactionUseCaseDto> {}