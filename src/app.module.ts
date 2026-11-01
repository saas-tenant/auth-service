import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { PrismaModule } from './database/prisma.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { UsersV2Module } from './users-v2/users-v2.module';
import { ZitadelService } from './modules/auth/services/zitadel.service';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    TenantModule,
    UsersV2Module,
  ],
  controllers: [HealthController, UsersController],
  providers: [HealthService, ZitadelService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude({
        path: 'v1/health/ok',
        method: RequestMethod.ALL,
      })
      .exclude({
        path: 'v1/users',
        method: RequestMethod.DELETE,
      })
      .forRoutes('*');
  }
}
