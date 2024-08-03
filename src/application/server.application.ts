import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RootModule } from './di/root.module'; // Import the root module
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './api/http-rest/transaction/guards/transaction.guard'; // Import the API key guard

export class ServerApplication {
  private host: string; // Host for the server
  private port: number; // Port for the server

  // Method to run the server application
  public async run(): Promise<void> {
    // Create a Nest application instance using NestExpressApplication
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);

    // Get configuration service
    const configService: ConfigService = app.get(ConfigService);

    // Retrieve host and port from configuration
    this.host = configService.getOrThrow<string>('APP.HOST');
    this.port = configService.getOrThrow<number>('APP.PORT');

    // Build API documentation
    this.buildAPIDocumentaion(app);
    // Log server information
    this.log();

    // Use global API key guard
    app.useGlobalGuards(new ApiKeyGuard(configService));
    // Start listening on the specified host and port
    await app.listen(this.port, this.host);
  }

  // Method to build API documentation using Swagger
  private buildAPIDocumentaion(app: NestExpressApplication): void {
    const title: string = "Ethereum Batch Transaction Development Kit";
    const description: string = "API Documentation";
    const version: string = '1.0.0';

    // Swagger options
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addApiKey({
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      }, 'API_KEY')
      .build();

    // Create Swagger document
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    // Setup Swagger module
    SwaggerModule.setup('swagger', app, document, {
      yamlDocumentUrl: 'swagger/yaml',
      jsonDocumentUrl: 'swagger/json'
    });
  }

  // Method to log server information
  private log(): void {
    Logger.log(`Server started on host: ${this.host}; port: ${this.port}`);
  }

  // Static method to create a new instance of ServerApplication
  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
