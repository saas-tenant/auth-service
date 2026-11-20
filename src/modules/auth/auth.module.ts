import { Module } from '@nestjs/common';

import { ZitadelService } from '@/modules/auth/services/zitadel.service';
import { UsersModule } from '@/modules/users/users.module';
import { AuthService } from './services/auth.service';
import { TenantModule } from '../tenant/tenant.module';
import { InternalTokenService } from './services/internal-token.service';
import { AuthController } from './controllers/auth.controller';
import { InternalTokenController } from './controllers/internal-token.controller';

@Module({
  imports: [UsersModule, TenantModule],
  controllers: [AuthController, InternalTokenController],
  providers: [AuthService, ZitadelService, InternalTokenService],
  exports: [ZitadelService, AuthService, InternalTokenService],
})
export class AuthModule {}
