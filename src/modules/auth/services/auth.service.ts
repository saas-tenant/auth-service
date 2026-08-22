import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { RegisterDto } from '../../../common/dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { ZitadelService } from '@/modules/auth/services/zitadel.service'; //this work
import { TenantContext } from '../../../common/context/tenant.context';

@Injectable()
export class AuthService {
  constructor(
    private readonly zitadelService: ZitadelService,
    private readonly usersService: UsersService,
    private readonly tenantContext: TenantContext,
  ) {}

  async register(dto: RegisterDto) {
    // 2. Check user inside THIS tenant
    const tenantId = this.tenantContext.getTenantId();
    // const tenant = await this.tenantService.findByDomain(dto.domain);
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    let zitadelUserId: string | undefined;

    try {
      // 2. Create identity in ZITADEL
      const zitadelUser = await this.zitadelService.createUser({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
      });

      zitadelUserId = zitadelUser.id;

      if (!zitadelUserId) {
        throw new Error('ZITADEL did not return userId');
      }

      // 3. Set password in ZITADEL
      await this.zitadelService.setPassword(zitadelUserId, dto.password);

      // 4. Create application user in SAAS DB
      const user = await this.usersService.create({
        zitadelUserId,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        name: dto.firstName + dto.lastName,
      });

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        zitadelUserId: user.zitadelUserId,
      };
    } catch (error) {
      console.error('Registration failed:', error);

      // ZITADEL user was created but
      // SAAS DB registration failed.
      //
      // Remove it so we don't leave
      // an orphaned ZITADEL user.
      if (zitadelUserId) {
        try {
          await this.zitadelService.deleteUser(zitadelUserId);
        } catch (cleanupError) {
          console.error('Failed to cleanup ZITADEL user:', cleanupError);
        }
      }

      throw new InternalServerErrorException('Registration failed');
    }
  }

  // async setPassword(dto: RegisterDto) {
  //   // 1. Find the user in our database
  //   const user = await this.usersService.findByEmail(dto.email);

  //   if (!user) {
  //     throw new ConflictException('User does not exist');
  //   }

  //   try {
  //     // 2. Set password in ZITADEL
  //     await this.zitadelService.setPassword(user.zitadelUserId, dto.password);

  //     return { message: 'Password set successfully' };
  //   } catch (error) {
  //     console.error('Set password failed:', error);
  //     throw new InternalServerErrorException('Set password failed');
  //   }
  // }
}
