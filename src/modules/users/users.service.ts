import { TenantContext } from '@/common/context/tenant.context';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
// import { TenantContext } from '../../common/context/tenant.context';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantContext: TenantContext,
  ) {}

  async findByEmail(email: string) {
    const tenantId = this.tenantContext.getTenantId();

    return this.prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          where: { tenantId },
          include: { tenant: true },
        },
      },
    });
  }

  async findByTenantEmail(email: string, tenantId: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        memberships: {
          some: { tenantId },
        },
      },
      include: {
        memberships: {
          where: { tenantId },
          include: { tenant: true },
        },
      },
    });
  }

  async findByZitadelId(zitadelUserId: string) {
    return this.prisma.user.findUnique({
      where: { zitadelUserId },
      include: {
        memberships: {
          include: { tenant: true },
        },
      },
    });
  }

  async removeUser(userId: string, tenantId: string) {
    return this.prisma.tenantMembership.deleteMany({
      where: {
        userId,
        tenantId,
      },
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

        memberships: {
          create: {
            tenantId,
            role: 'MEMBER',
            status: 'PENDING',
          },
        },
      },
      include: {
        memberships: {
          where: { tenantId },
          include: { tenant: true },
        },
      },
    });
  }

  async findAll() {
    const tenantId = this.tenantContext.getTenantId();

    return this.prisma.user.findMany({
      where: {
        memberships: {
          some: { tenantId },
        },
      },
      include: {
        memberships: {
          where: { tenantId },
          include: { tenant: true },
        },
      },
    });
  }
}
