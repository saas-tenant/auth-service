import { Module } from '@nestjs/common';

import { ZitadelService } from '@/modules/auth/services/zitadel.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [UsersModule, TenantModule],
  controllers: [AuthController],
  providers: [AuthService, ZitadelService],
})
export class AuthModule {}
