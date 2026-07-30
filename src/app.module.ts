import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';

@Module({
  imports: [HealthModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
