// dto/check-tenant-permission.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export type TenantPermission =
  'owner' | 'admin' | 'member' | 'can_manage_tenant' | 'can_view_tenant';

export class CheckTenantPermissionDto {
  @ApiProperty({
    example: 'user_123',
    description: 'User identifier used in OpenFGA tuples',
  })
  user: string;

  @ApiProperty({
    example: 'ramand',
    description: 'Tenant identifier used in OpenFGA tuples',
  })
  tenant: string;

  @ApiProperty({
    example: 'can_manage_tenant',
    enum: ['owner', 'admin', 'member', 'can_manage_tenant', 'can_view_tenant'],
    description: 'Relation or permission to evaluate on tenant:<tenantId>',
  })
  permission: TenantPermission;
}

export class addTenantPermissionDto {
  @ApiProperty({
    example: 'user_123',
    description: 'User identifier used in OpenFGA tuples',
  })
  user: string;

  @ApiProperty({
    example: 'ramand',
    description: 'Tenant identifier used in OpenFGA tuples',
  })
  tenant: string;

  @ApiProperty({
    example: 'admin',
    enum: ['owner', 'admin', 'member'],
    description: 'Relation or permission to evaluate on tenant:<tenantId>',
  })
  permission: TenantPermission;
}
