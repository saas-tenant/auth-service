import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const hostname = req.hostname;

    if (!hostname) {
      throw new NotFoundException('Tenant hostname is missing');
    }

    const tenant = await this.tenantService.findByDomain(hostname);

    req.tenant = tenant;

    next();
  }
}
