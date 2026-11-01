import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../database/prisma.module';
import { TenantModule } from '../tenant/tenant.module';
import { ZitadelService } from '../auth/services/zitadel.service';

@Module({
  imports: [PrismaModule, TenantModule],
  controllers: [UsersController],
  providers: [UsersService, ZitadelService],
  exports: [UsersService],
})
export class UsersModule {}
