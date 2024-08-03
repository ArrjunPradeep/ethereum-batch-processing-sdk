import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * ApiKeyGuard is a guard used to protect routes by validating an API key.
 * It implements the CanActivate interface to control access based on the provided API key.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  // Inject ConfigService to access configuration values
  constructor(private readonly configService: ConfigService) {
    
  }

  /**
   * Determines whether the request is allowed based on the API key.
   * 
   * @param context - The execution context containing the request
   * @returns true if the API key is valid, otherwise throws UnauthorizedException
   */
  canActivate(context: ExecutionContext): boolean {
    // Retrieve the HTTP request from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract the API key from the request headers
    const apiKey = request.headers['x-api-key'] || request.headers['X-Api-Key'];

    // Validate the API key
    if (this.validateApiKey(apiKey)) {
      return true;
    } else {
      // Throw an exception if the API key is invalid
      throw new UnauthorizedException('Invalid API key');
    }
  }

  /**
   * Validates the provided API key against the configured secret key.
   * 
   * @param apiKey - The API key to be validated
   * @returns true if the API key matches the configured secret key, otherwise false
   */
  validateApiKey(apiKey: string): boolean {
    // Retrieve the valid API key from the configuration
    const validApiKey = this.configService.getOrThrow<string>('APP.API_SECRET_KEY');
    console.log("🚀 ~ VALIDATE ~ canActivate ~ apiK̥ey:", validApiKey)
    // Check if the provided API key matches the valid API key
    return apiKey === validApiKey;
  }
}
