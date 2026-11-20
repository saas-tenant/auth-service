import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { PrismaModule } from '@/database/prisma.module';
// import { TenantContext } from '../../common/context/tenant.context';
import { TenantMiddleware } from '../../common/middleware/tenant.middleware';
import { OpenFgaModule } from '../permission/permission.module';
import { TenantsController } from './tenant.controller';
import { TenantContext } from '@/common/context/tenant.context';

@Module({
  imports: [PrismaModule, OpenFgaModule],
  controllers: [TenantsController],
  providers: [TenantService, TenantMiddleware, TenantContext],
  exports: [TenantService, TenantContext],
})
export class TenantModule {}
