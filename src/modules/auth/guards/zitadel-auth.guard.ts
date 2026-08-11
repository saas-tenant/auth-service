import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import { ZitadelService } from '../services/zitadel.service';

@Injectable()
export class ZitadelAuthGuard implements CanActivate {
  constructor(private readonly zitadelService: ZitadelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Bearer token is required');
    }

    const payload = await this.zitadelService.verifyAccessToken(token);

    const user = await this.zitadelService.getUserInfo(token);

    request.user = {
      ...user,
      claims: payload,
      accessToken: token,
    };

    return true;
  }
}
