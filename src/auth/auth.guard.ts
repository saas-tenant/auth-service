import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class ZitadelAuthGuard implements CanActivate {
  private readonly issuer = process.env.ZITADEL_ISSUER!;
  private readonly audience = process.env.ZITADEL_CLIENT_ID!;

  private readonly jwks = createRemoteJWKSet(
    new URL(`${this.issuer}/oauth/v2/keys`),
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    console.log('========== ZITADEL AUTH ==========');
    console.log('URL:', request.url);
    console.log('Authorization:', request.headers.authorization);
    console.log('Cookies:', request.cookies);
    console.log('==================================');

    if (!authorization) {
      throw new UnauthorizedException('Missing access token');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid access token');
    }

    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: this.audience,
      });

      request.user = payload;

      return true;
    } catch (error) {
      console.error('ZITADEL token verification failed:', error);

      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
