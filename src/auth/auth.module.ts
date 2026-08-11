import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/database/prisma.module';
import { PasswordService } from '@/modules/auth/services/password.service';
import { TokenService } from '@/modules/auth/services/jwt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@/modules/auth/repositories/auth.repository';
import { SupertokensService } from '@/modules/auth/services/supertokens.service';
import { ZitadelAuthGuard } from '@/modules/auth/guards/zitadel-auth.guard';
import { ZitadelService } from '@/modules/auth/services/zitadel.service';

@Module({
  imports: [
    PrismaModule, // Provides PrismaService
  ],
  controllers: [AuthController],
  providers: [ZitadelService, ZitadelAuthGuard, AuthService],
  exports: [ZitadelService, ZitadelAuthGuard, AuthService], // Export ZitadelService and ZitadelAuthGuard for use in other modules
})
export class AuthModule {}
