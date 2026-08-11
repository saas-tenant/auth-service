import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { middleware as supertokensMiddleware } from 'supertokens-node/framework/express';
import { SuperTokensExceptionFilter } from './auth/auth.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4000'], // Your frontend URL
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  // Attach SuperTokens Express Middleware
  app.use(supertokensMiddleware());

  // Attach Global Exception Filter for SuperTokens
  app.useGlobalFilters(new SuperTokensExceptionFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
