import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { Tenant, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string, tenantId: string) {
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
    tenant: Tenant;
    tenantId: Tenant['id'];
  }) {
    return this.prisma.user.create({
      data: {
        zitadelUserId: data.zitadelUserId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.name,
        tenantId: data.tenantId,
      },
    });
  }
}
