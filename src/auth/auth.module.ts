import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ZitadelService } from '@/modules/auth/services/zitadel.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, ZitadelService],
})
export class AuthModule {}
