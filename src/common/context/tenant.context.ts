import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

export interface TenantContextData {
  tenantId: string;
  domain: string;
}

@Injectable()
export class TenantContext {
  private readonly storage = new AsyncLocalStorage<TenantContextData>();

  run<T>(context: TenantContextData, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  get(): TenantContextData {
    const context = this.storage.getStore();

    if (!context) {
      throw new Error('Tenant context is not available');
    }

    return context;
  }

  getTenantId(): string {
    return this.get().tenantId;
  }

  getDomain(): string {
    return this.get().domain;
  }
}
