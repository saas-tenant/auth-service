import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { PrismaModule } from './database/prisma.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantMiddleware } from './modules/tenant/tenant.middleware';

@Module({
  imports: [HealthModule, AuthModule, UsersModule, PrismaModule, TenantModule],
  controllers: [HealthController, UsersController],
  providers: [HealthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
