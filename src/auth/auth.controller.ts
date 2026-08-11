// import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SupertokensService } from '@/modules/auth/services/supertokens.service';
import { JwtAuthGuard } from './auth.guard';

// @Controller('v1/auth')
// @UseGuards(JwtAuthGuard)
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly supertokensService: SupertokensService,
//   ) {}

//   @Post('register')
//   register(@Body() dto: RegisterDto) {
//     return this.authService.register(dto);
//   }

//   @Post('login')
//   login(@Body() dto: LoginDto) {
//     return this.authService.login(dto);
//   }

//   @Post('signup')
//   signUp() {
//     return { hello: 'signup' };
//   }
// }

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ZitadelAuthGuard } from '@/modules/auth/guards/zitadel-auth.guard';
import type { Request } from 'express';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // @UseGuards(ZitadelAuthGuard)
  register(@Req() request: Request, @Body() dto: RegisterDto) {
    return this.authService.register(request.user!, dto);
  }

  @Get('me')
  @UseGuards(ZitadelAuthGuard)
  getMe(@Req() request: Request) {
    return request.user;
  }
}
