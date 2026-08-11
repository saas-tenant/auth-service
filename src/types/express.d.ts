import { ZitadelUser } from '@/modules/auth/services/zitadel.service';

declare global {
  namespace Express {
    interface Request {
      user?: ZitadelUser & {
        claims: Record<string, unknown>;
        accessToken: string;
      };
    }
  }
}

export {};
