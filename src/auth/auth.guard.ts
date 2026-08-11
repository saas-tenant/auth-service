import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    console.log(
      'SuperTokensAuthGuard: Verifying session for request:',
      req.cookies,
      req.url,
    );
    try {
      // Verify active session using SuperTokens SDK
      await verifySession()(req, res, (err) => {
        if (err) throw err;
      });
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
