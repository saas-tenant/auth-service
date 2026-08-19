import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4000',
      'http://localhost:3000',
      'http://localhost:3000',
      'http://elegant.local:3000',
      'http://ramand.local:3000',
    ], // Your frontend URL
    allowedHeaders: ['content-type'],
    credentials: true,
  });

  // 1. Build the OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('API documentation for the NestJS application')
    .setVersion('1.0')
    .addBearerAuth() // Optional: Adds JWT auth support in Swagger UI
    .build();

  // 2. Create the document
  const document = SwaggerModule.createDocument(app, config);

  // Attach SuperTokens Express Middleware
  app.use(cookieParser());

  // 3. Mount Swagger UI at http://localhost:3000/api
  SwaggerModule.setup('api', app, document);

  // Attach Global Exception Filter for SuperTokens
  // app.useGlobalFilters(new SuperTokensExceptionFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
