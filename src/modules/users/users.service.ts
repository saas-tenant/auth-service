import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../../common/dtos/register.dto';
import { Tenant, User } from '@prisma/client';
import { TenantContext } from '../../common/context/tenant.context';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantContext: TenantContext,
  ) {}

  async findByEmail(email: string) {
    const tenantId = this.tenantContext.getTenantId();
    return this.prisma.user.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
    });
  }
  async findByZitadelId(zitadelUserId: string) {
    return this.prisma.user.findUnique({
      where: { zitadelUserId },
    });
  }

  async create(data: {
    zitadelUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    name: string | null;
  }) {
    const tenantId = this.tenantContext.getTenantId();
    return this.prisma.user.create({
      data: {
        zitadelUserId: data.zitadelUserId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.name,
        tenantId: tenantId,
      },
    });
  }

  async findAll() {
    const tenantId = this.tenantContext.getTenantId();

    return this.prisma.user.findMany({
      where: {
        tenantId,
      },
    });
  }
}
