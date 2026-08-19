import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { TenantService } from './tenant.service';
import { TenantContext } from './tenant.context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantService: TenantService,
    private readonly tenantContext: TenantContext,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const hostname = req.hostname;

    if (!hostname) {
      throw new NotFoundException('Tenant hostname is missing');
    }

    const tenant = await this.tenantService.findByDomain(hostname);

    this.tenantContext.run(
      {
        tenantId: tenant.id,
        domain: tenant.domain,
      },
      () => {
        req.tenant = tenant;
        next();
      },
    );
  }
}
