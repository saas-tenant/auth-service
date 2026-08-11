import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export interface ZitadelUser {
  sub: string;
  email?: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
  name?: string;
  preferred_username?: string;
}

@Injectable()
export class ZitadelService {
  private readonly issuer: string;
  private readonly clientId: string;
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor() {
    this.issuer = process.env.ZITADEL_ISSUER ?? '';
    this.clientId = process.env.ZITADEL_CLIENT_ID ?? '';

    if (!this.issuer) {
      throw new Error('ZITADEL_ISSUER is not configured');
    }

    if (!this.clientId) {
      throw new Error('ZITADEL_CLIENT_ID is not configured');
    }

    const jwksUrl = new URL('/oauth/v2/keys', this.issuer);

    this.jwks = createRemoteJWKSet(jwksUrl);
  }

  async verifyAccessToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
      });

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  async getUserInfo(token: string): Promise<ZitadelUser> {
    const response = await fetch(new URL('/oidc/v1/userinfo', this.issuer), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new UnauthorizedException('Unable to retrieve user information');
    }

    return response.json();
  }
}
