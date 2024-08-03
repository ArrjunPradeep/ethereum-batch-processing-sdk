/**
 * This file defines dependency injection (DI) tokens for the transaction domain.
 * 
 * Dependency injection tokens are unique symbols used to identify and manage
 * different dependencies within the DI container. By using these tokens, you
 * can ensure that the correct implementations of use cases and repositories are
 * injected into the components that require them.
 * 
 * This approach promotes loose coupling and makes it easier to manage and
 * swap out implementations without changing the dependent code.
 */
export class TransactionDITokens {

    // USE-CASES
    
    /**
     * Token for the Send Coin use case implementation.
     * 
     * This symbol is used to register and resolve the Send Coin use case within
     * the DI container. It allows for injecting the specific implementation of
     * the Send Coin use case wherever it is needed.
     */
    public static readonly sendCoinUseCase: unique symbol = Symbol('sendCoinUseCase');
    
    /**
     * Token for the Send Token use case implementation.
     * 
     * This symbol is used to register and resolve the Send Token use case within
     * the DI container. It allows for injecting the specific implementation of
     * the Send Token use case wherever it is needed.
     */
    public static readonly sendTokenUseCase: unique symbol = Symbol('sendTokenUseCase');
    
    /**
     * Token for the Gas Estimator use case implementation.
     * 
     * This symbol is used to register and resolve the Gas Estimator use case within
     * the DI container. It allows for injecting the specific implementation of
     * the Gas Estimator use case wherever it is needed.
     */
    public static readonly gasEstimatorUseCase: unique symbol = Symbol('gasEstimatorUseCase');

    /**
     * Token for the Transaction Repository implementation.
     * 
     * This symbol is used to register and resolve the Transaction Repository within
     * the DI container. It allows for injecting the specific implementation of
     * the Transaction Repository wherever it is needed.
     */
    public static readonly TransactionRepository: unique symbol = Symbol('TransactionRepository');

}