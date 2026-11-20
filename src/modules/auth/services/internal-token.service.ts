import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignJWT, importPKCS8 } from 'jose';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

@Injectable()
export class InternalTokenService {
  private privateKeyPromise = this.loadPrivateKey();

  private async loadPrivateKey() {
    const keyPath =
      process.env.INTERNAL_JWT_PRIVATE_KEY_PATH ??
      join(process.cwd(), 'keys', 'jwt-private.pem');

    try {
      const privateKey = await readFile(keyPath, 'utf8');
      return await importPKCS8(privateKey, 'RS256');
    } catch (error) {
      console.error('Failed to load internal JWT private key:', error);
      throw new InternalServerErrorException(
        'Internal JWT signing key is unavailable',
      );
    }
  }

  async issueToken(userId: string, tenantId: string): Promise<string> {
    const privateKey = await this.privateKeyPromise;

    return new SignJWT({
      tenant_id: tenantId,
    })
      .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
      .setIssuer('saas-auth-service')
      .setAudience('project-service')
      .setSubject(userId)
      .setJti(randomUUID())
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(privateKey);
  }
}
