/**
 * Generic interface that defines a contract for all use cases in the application.
 * 
 * In Clean Architecture, a use case represents a specific business action or
 * operation that the application can perform. Each use case is implemented as
 * a class that adheres to this interface, ensuring consistency and predictability
 * across all use cases.
 *
 * @template TUseCasePort - The type of the input parameter (port) that the use case accepts.
 *                          This represents the data required to execute the use case.
 *                          It can be an object, primitive type, or even undefined.
 *
 * @template TUseCaseResult - The type of the result that the use case produces.
 *                            This represents the data returned after the use case is executed.
 *                            It can be any type, including void, a primitive, or an object.
 *
 */
export interface UseCase<TUseCasePort, TUseCaseResult> {
    /**
     * Executes the use case with the provided input (port).
     * 
     * This method contains the business logic for the use case and performs the
     * desired operation. It returns a promise that resolves with the result of
     * the operation.
     *
     * @param port - The input parameter required to execute the use case.
     *               This is optional and can be omitted if the use case doesn't
     *               require any input.
     * @returns A promise that resolves with the result of the use case.
     */
    execute(port?: TUseCasePort): Promise<TUseCaseResult>;
}