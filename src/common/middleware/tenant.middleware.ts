import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { TenantContext } from '../../common/context/tenant.context';
import { TenantService } from '../../modules/tenant/tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantService: TenantService,
    private readonly tenantContext: TenantContext,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const forwardedHost = req.headers['x-forwarded-host'];

    const host =
      typeof forwardedHost === 'string' ? forwardedHost : req.headers.host;

    const hostname = host?.split(':')[0];

    if (!hostname) {
      throw new NotFoundException('Tenant hostname is missing');
    }
    console.log(req.headers.referer, hostname);

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
