import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  Version,
  Delete,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ZitadelAuthGuard } from '../../common/guards/zitadel.guard';
import { ZitadelService } from '../auth/services/zitadel.service';
import { DeleteDto } from '@/common/dtos/delete-user.dto';
import { TenantService } from '../tenant/tenant.service';
import { log } from 'console';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller({ path: 'users', version: 'v1' })
export class UsersController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly usersService: UsersService,
    private readonly zitadelService: ZitadelService,
  ) {}

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

  @Delete('')
  @Version('1')
  // @UseGuards(ZitadelAuthGuard)
  async removeUser(@Body() dto: DeleteDto) {
    log(dto);
    const tenant = await this.tenantService.findByDomain(dto.tenant);
    const user = await this.usersService.findByTenantEmail(
      dto.email,
      tenant.id,
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    try {
      const ZitadelResponse = await this.zitadelService.deleteUser(
        user.zitadelUserId,
      );
      const response = await this.usersService.removeUser(user);
    } catch (error) {
      throw new ExceptionsHandler(error);
    }

    return {
      status: 'OK',
    };
  }
}
