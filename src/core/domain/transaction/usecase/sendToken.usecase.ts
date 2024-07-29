import { UseCase } from "src/core/common/usecase/Usecase";
import { sendTokenPort } from "../port/usecase/sendToken.port";
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

export interface sendTokenUseCase extends UseCase<sendTokenPort, TransactionUseCaseDto> {}