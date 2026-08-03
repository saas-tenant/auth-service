import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/database/prisma.module';
import { PasswordService } from '@/modules/auth/services/password.service';
import { TokenService } from '@/modules/auth/services/jwt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@/modules/auth/repositories/auth.repository';
import { SupertokensService } from '@/modules/auth/services/supertokens.service';

@Module({
  imports: [
    PrismaModule, // Provides PrismaService
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    AuthRepository,
    SupertokensService,
  ],
})
export class AuthModule {}
