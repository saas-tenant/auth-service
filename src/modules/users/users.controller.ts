import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  Version,
} from '@nestjs/common';
import { ZitadelAuthGuard } from '../../common/guards/zitadel.guard';

@Controller({ path: 'users', version: 'v1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Version('1')
  @UseGuards(ZitadelAuthGuard)
  async getMyProfile(@Req() req: any) {
    const zitadelUserId = req.user?.sub;

    if (!zitadelUserId) {
      throw new UnauthorizedException('Invalid authentication token');
    }

    const user = await this.usersService.findByZitadelId(zitadelUserId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      status: 'OK',
      user,
    };
  }
}
