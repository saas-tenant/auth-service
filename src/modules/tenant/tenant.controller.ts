import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CheckTenantPermissionDto } from '@/common/dtos/permission.dto';

@ApiTags('Tenants')
@ApiCookieAuth() // Helpful if auth relies on cookies / SuperTokens session
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('check')
  @ApiOperation({ summary: 'Check if current user can manage active tenant' })
  @ApiOkResponse({
    description: 'User is authorized to manage the tenant',
    schema: {
      example: { message: 'You can manage this tenant' },
    },
  })
  @ApiHeader({
    name: 'x-tenant-host',
    required: false,
    description:
      'Override host for local/Swagger testing (e.g. ramand.saas.local)',
  })
  @ApiForbiddenResponse({ description: 'Missing can_manage_tenant permission' })
  async manageTenant(@Body() req: CheckTenantPermissionDto) {
    const allowed = await this.tenantService.checkTenantPermission({
      user: req.user,
      tenantId: req.tenant,
      permission: 'can_manage_tenant',
    });

    if (!allowed) {
      throw new ForbiddenException();
    }

    return {
      message: 'You can manage this tenant',
    };
  }

  @Post('grant')
  @ApiHeader({
    name: 'x-tenant-host',
    required: false,
    description:
      'Override host for local/Swagger testing (e.g. ramand.saas.local)',
  })
  async grantPermissionToTenant(@Body() req: CheckTenantPermissionDto) {
    return await this.tenantService.addTenantPermission({
      user: req.user,
      tenantId: req.tenant,
      relation: req.permission,
    });
  }
}
