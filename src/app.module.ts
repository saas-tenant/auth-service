import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';
import { AuthModule } from './auth/auth.module';
import { SupertokensService } from './modules/auth/services/supertokens.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [HealthModule, AuthModule, UsersModule],
  controllers: [HealthController, UsersController],
  providers: [HealthService, SupertokensService],
})
export class AppModule {}
