// This generic interface defines a contract for all use cases in the application.
export interface UseCase<TUseCasePort, TUseCaseResult> {
    execute(port?: TUseCasePort): Promise<TUseCaseResult>;
}