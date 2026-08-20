import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { decode } from '@auth/core/jwt';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class ZitadelAuthGuard implements CanActivate {
  private readonly authSecret = process.env.AUTH_SECRET!;
  private readonly sessionCookie = 'authjs.session-token';

  private readonly issuer = process.env.ZITADEL_ISSUER!;
  private readonly audience = process.env.ZITADEL_CLIENT_ID!;

  private readonly jwks = createRemoteJWKSet(
    new URL(`${this.issuer}/oauth/v2/keys`),
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 1. Get Auth.js cookie
    const sessionToken = request.cookies?.[this.sessionCookie];

    if (!sessionToken) {
      throw new UnauthorizedException('Missing Auth.js session');
    }

    // 2. Decode Auth.js session
    const authToken = await decode({
      token: sessionToken,
      secret: this.authSecret,
      salt: this.sessionCookie,
    });

    if (!authToken) {
      throw new UnauthorizedException('Invalid Auth.js session');
    }

    // 3. Get ZITADEL access token
    const accessToken = authToken.accessToken as string;

    if (!accessToken) {
      throw new UnauthorizedException('Missing ZITADEL access token');
    }

    // 4. Verify ZITADEL JWT locally
    try {
      const { payload } = await jwtVerify(accessToken, this.jwks, {
        issuer: this.issuer,
        audience: this.audience,
      });

      // 5. Make identity available to controllers
      request.user = payload;

      return true;
    } catch (error) {
      console.error(
        'ZITADEL JWT verification failed:',
        error instanceof Error ? error.message : error,
      );

      throw new UnauthorizedException('Invalid or expired ZITADEL token');
    }
  }
}
