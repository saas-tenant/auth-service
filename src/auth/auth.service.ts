import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';
import { ZitadelUser } from '@/modules/auth/services/zitadel.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(zitadelUser: ZitadelUser, dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        zitadelId: zitadelUser.sub,
      },
    });

    if (existingUser) {
      throw new ConflictException('User is already registered');
    }

    if (!zitadelUser.email) {
      throw new ConflictException('ZITADEL account does not have an email');
    }

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: zitadelUser.email,
      },
    });

    if (existingEmail) {
      throw new ConflictException('Email is already registered');
    }

    const slug = this.generateSlug(dto.company);

    const result = await this.prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: dto.company,
          slug,
        },
      });

      const user = await tx.user.create({
        data: {
          zitadelId: zitadelUser.sub,

          firstName: zitadelUser.given_name ?? zitadelUser.name ?? '',

          lastName: zitadelUser.family_name ?? '',

          email: zitadelUser.email as any,

          status: 'ACTIVE',
        },
      });

      const membership = await tx.membership.create({
        data: {
          tenantId: tenant.id,
          userId: user.id,
          role: 'OWNER',
        },
      });

      return {
        user,
        tenant,
        membership,
      };
    });

    return {
      user: {
        id: result.user.id,
        zitadelId: result.user.zitadelId,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
      },

      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
        slug: result.tenant.slug,
      },

      role: result.membership.role,
    };
  }

  private generateSlug(name: string) {
    return (
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-') +
      '-' +
      Date.now()
    );
  }
}
