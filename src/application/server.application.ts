import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RootModule } from './di/root.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ServerApplication {
  private host: string;
  private port: number;

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);

    const configService: ConfigService = app.get(ConfigService);

    this.host = configService.getOrThrow<string>('APP.HOST');
    this.port = configService.getOrThrow<number>('APP.PORT');

    this.buildAPIDocumentaion(app);
    this.log();

    await app.listen(this.port, this.host);
  }

  private buildAPIDocumentaion(app: NestExpressApplication): void {
    const title: string = "Ethereum Batch Transaction Development Kit";
    const description: string = "API Documentation";
    const version: string = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document, {
      yamlDocumentUrl: 'swagger/yaml',
      jsonDocumentUrl: 'swagger/json'
    });
  }

  private log(): void {
    Logger.log(`Server started on host: ${this.host}; port: ${this.port}`);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
