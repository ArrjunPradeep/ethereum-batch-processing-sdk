/* These symbols used as DI tokens are used to identify different 
   use case implementations in the DI container
*/
export class TransactionDITokens {

    // USE-CASES
    // public static readonly createTransactionUseCase: unique symbol = Symbol('createTransactionUseCase');
    public static readonly sendCoinUseCase: unique symbol = Symbol('sendCoinUseCase');
    public static readonly sendTokenUseCase: unique symbol = Symbol('sendTokenUseCase');
    public static readonly gasEstimatorUseCase: unique symbol = Symbol('gasEstimatorUseCase');

    // REPOSITORIES
    public static readonly TransactionRepository: unique symbol = Symbol('TransactionRepository');

}