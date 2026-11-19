import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OpenFgaService } from '../permission/permission.service';
import { ClientWriteResponse } from '@openfga/sdk/dist/client';

@Injectable()
export class TenantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openFgaService: OpenFgaService,
  ) {}

  // async findByDomain(domain: string) {
  //   const tenant = await this.prisma.tenant.findUnique({
  //     where: { domain },
  //   });

  //   if (!tenant) {
  //     throw new NotFoundException(`Tenant not found: ${domain}`);
  //   }

  //   if (tenant.status !== 'ACTIVE') {
  //     throw new NotFoundException(`Tenant is not active`);
  //   }

  //   return tenant;
  // }

  async findByDomain(domain: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        domain,
      },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant not found: ${domain}`);
    }

    return tenant;
  }

  async findbyId(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant not found: ${id}`);
    }

    return tenant;
  }

  async checkTenantPermission(params: {
    user: string;
    tenantId: string;
    permission: string;
  }): Promise<boolean> {
    return this.openFgaService.check({
      user: `user:${params.user}`,
      relation: params.permission,
      object: `tenant:${params.tenantId}`,
    });
  }

  async addTenantPermission(params: {
    user: string;
    tenantId: string;
    relation: string;
  }): Promise<ClientWriteResponse> {
    return this.openFgaService.write({
      user: `user:${params.user}`,
      relation: params.relation,
      object: `tenant:${params.tenantId}`,
    });
  }
}
