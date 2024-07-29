import { UseCase } from "src/core/common/usecase/Usecase";
import { sendCoinPort } from "../port/usecase/sendCoin.port";
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

export interface sendCoinUseCase extends UseCase<sendCoinPort, TransactionUseCaseDto> {}