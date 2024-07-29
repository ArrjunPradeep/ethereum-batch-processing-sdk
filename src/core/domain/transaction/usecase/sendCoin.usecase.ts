import { UseCase } from "src/core/common/usecase/Usecase";
import { SendCoinPort } from "../port/usecase/sendCoin.port";
import { TransactionUseCaseDto } from "./dto/TransactionUseCase.dto";

export interface sendCoinUseCase extends UseCase<SendCoinPort, TransactionUseCaseDto> {}