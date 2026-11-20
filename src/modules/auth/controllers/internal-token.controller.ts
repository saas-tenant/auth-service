import {
  Controller,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JWTPayload } from 'jose';

import { InternalTokenService } from '../services/internal-token.service';
import { UsersService } from '@/modules/users/users.service';
import { TenantContext } from '@/common/context/tenant.context';
import { ZitadelAuthGuard } from '@/common/guards/zitadel.guard';

@Controller('internal')
export class InternalTokenController {
  constructor(
    private readonly internalTokenService: InternalTokenService,
    private readonly usersService: UsersService,
    private readonly tenantContext: TenantContext,
  ) {}

  @Post('token')
  @UseGuards(ZitadelAuthGuard)
  async issueToken(@Req() req: Request) {
    // 1. Get the verified ZITADEL identity from the guard.
    const claims = (req as Request & { user?: JWTPayload }).user;
    const zitadelUserId = claims?.sub;

    if (!zitadelUserId) {
      throw new UnauthorizedException('Invalid user identity');
    }

    // 2. Resolve the current tenant from the trusted tenant context.
    const tenantId = this.tenantContext.getTenantId();

    // 3. Find the global user and their tenant memberships.
    const user = await this.usersService.findByZitadelId(zitadelUserId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 4. Verify membership in this tenant.
    const membership = user.memberships.find(
      (item) => item.tenantId === tenantId,
    );

    if (!membership || membership.status !== 'ACTIVE') {
      throw new ForbiddenException('No active membership in this tenant');
    }

    // 5. Verify that the tenant itself is active.
    if (membership.tenant.status !== 'ACTIVE') {
      throw new ForbiddenException('Tenant is not active');
    }

    // 6. Issue the internal JWT.
    const accessToken = await this.internalTokenService.issueToken(
      user.id,
      tenantId,
    );

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 300,
    };
  }
}
