import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientWriteResponse, OpenFgaClient } from '@openfga/sdk';

export interface CheckPermissionParams {
  user: string;
  relation: string;
  object: string;
}

@Injectable()
export class OpenFgaService {
  private readonly client: OpenFgaClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenFgaClient({
      apiUrl: this.configService.getOrThrow<string>('OPENFGA_API_URL'),
      storeId: this.configService.getOrThrow<string>('OPENFGA_STORE_ID'),
      authorizationModelId:
        this.configService.getOrThrow<string>('OPENFGA_MODEL_ID'),
    });
  }

  /**
   * Check whether a user has a specific relation
   * with a particular object.
   */
  async check(params: CheckPermissionParams): Promise<boolean> {
    const { allowed } = await this.client.check({
      user: params.user,
      relation: params.relation,
      object: params.object,
    });

    return !!allowed;
  }

  async write(params: CheckPermissionParams): Promise<ClientWriteResponse> {
    return await this.client.write({
      writes: [
        {
          object: params.object,
          relation: params.relation,
          user: params.user,
        },
      ],
    });
  }
}
