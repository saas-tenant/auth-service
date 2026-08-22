import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersV2Module } from './users-v2/users-v2.module';
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

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('SaaS API')
    .setDescription('SaaS Platform API')
    .setVersion('1.0')
    .build();

  const configv2 = new DocumentBuilder()
    .setTitle('SaaS API')
    .setDescription('SaaS Platform API')
    .setVersion('2.0')
    .build();

  const v1Document = SwaggerModule.createDocument(app, config, {
    include: [HealthModule, AuthModule, UsersModule],
  });

  const v2Document = SwaggerModule.createDocument(app, configv2, {
    include: [HealthModule, UsersV2Module],
  });
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document);
  SwaggerModule.setup('docs/v1', app, v1Document, {
    jsonDocumentUrl: '/docs/v1/swagger.json',
  });

  SwaggerModule.setup('docs/v2', app, v2Document, {
    jsonDocumentUrl: '/docs/v2/swagger.json',
  });

  SwaggerModule.setup('docs', app, v1Document, {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          name: 'V1',
          url: '/docs/v1/swagger.json',
        },
        {
          name: 'V2',
          url: '/docs/v2/swagger.json',
        },
      ],
      'urls.primaryName': 'V1',
    },
  });
  // Attach SuperTokens Express Middleware
  app.use(cookieParser());

  // Attach Global Exception Filter for SuperTokens
  // app.useGlobalFilters(new SuperTokensExceptionFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
