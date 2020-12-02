import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { warn } from 'console';
import { GenesModule } from './genes/genes.module';
import { TermsModule } from './terms/terms.module';

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = 'api/docs';
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = 'API';
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = 'API Description';
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = '1.0';


const bootstrap = async () => {
  const app = await NestFactory.create(
    AppModule,
  );
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addServer('/api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      AppModule,
      TermsModule,
      GenesModule,
    ]
  })
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const PORT = 3001;

  await app.listen(PORT, '0.0.0.0');

  warn(`APP IS LISTENING TO PORT ${PORT}`);
}

bootstrap();

