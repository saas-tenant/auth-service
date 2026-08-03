import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SupertokensService } from '@/modules/auth/services/supertokens.service';
import { SuperTokensAuthGuard } from './auth.guard';

@Controller('v1/auth')
// @UseGuards(SuperTokensAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly supertokensService: SupertokensService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signUp() {
    return { hello: 'signup' };
  }
}
