import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { PrismaModule } from '@/database/prisma.module';
import { TenantContext } from '../../common/context/tenant.context';
import { TenantMiddleware } from '../../common/middleware/tenant.middleware';

@Module({
  imports: [PrismaModule],
  providers: [TenantService, TenantMiddleware, TenantContext],
  exports: [TenantService, TenantContext],
})
export class TenantModule {}
