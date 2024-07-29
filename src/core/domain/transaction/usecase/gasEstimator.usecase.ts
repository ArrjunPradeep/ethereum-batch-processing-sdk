import { UseCase } from "src/core/common/usecase/Usecase";
import { gasEstimatorPort } from "../port/usecase/gasEstimator.port";
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

// Input: gasEstimatorPort — The data needed to estimate gas.
// Output: TransactionUseCaseDto — The result of the gas estimation, which is formatted according to this DTO.

export interface gasEstimatorUseCase extends UseCase<gasEstimatorPort, TransactionUseCaseDto> {}