import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from '../../common/dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('set-password')
  setPassword(@Body() dto: RegisterDto) {
    // return this.authService.setPassword(dto);
  }
}
