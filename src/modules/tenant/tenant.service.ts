import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

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
}
