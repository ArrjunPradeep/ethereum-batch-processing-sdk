import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {
    
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] || request.headers['X-Api-Key'];

    if (this.validateApiKey(apiKey)) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }

  validateApiKey(apiKey: string): boolean {
    const validApiKey = this.configService.getOrThrow<string>('APP.API_SECRET_KEY');
    console.log("🚀 ~ VALIDATE ~ canActivate ~ apiK̥ey:", validApiKey)
    return apiKey === validApiKey;
  }
}
