import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthModule, AuthModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
