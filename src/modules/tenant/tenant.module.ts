import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { PrismaModule } from '@/database/prisma.module';
import { TenantMiddleware } from './tenant.middleware';

@Module({
  imports: [PrismaModule],
  providers: [TenantService, TenantMiddleware],
  exports: [TenantService],
})
export class TenantModule {}
