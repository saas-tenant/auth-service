import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { PrismaModule } from '@/database/prisma.module';
import { TenantMiddleware } from './tenant.middleware';
import { TenantContext } from './tenant.context';

@Module({
  imports: [PrismaModule],
  providers: [TenantService, TenantMiddleware, TenantContext],
  exports: [TenantService, TenantContext],
})
export class TenantModule {}
