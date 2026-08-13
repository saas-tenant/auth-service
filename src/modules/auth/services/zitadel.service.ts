import { Injectable } from '@nestjs/common';
import Zitadel from '@zitadel/zitadel-node';

@Injectable()
export class ZitadelService {
  private readonly client: Zitadel;

  constructor() {
    this.client = Zitadel.withAccessToken(
      process.env.ZITADEL_URL!,
      process.env.ZITADEL_SERVICE_TOKEN!,
    );
  }

  private async getClient() {
    return this.client;
  }

  async createUser(data: {
    email: string;
    firstName: string;
    lastName: string;
  }) {
    const client = await this.getClient();

    const response = await client.users.createUser({
      userServiceCreateUserRequest: {
        organizationId: process.env.ZITADEL_ORG_ID!,

        human: {
          profile: {
            givenName: data.firstName,
            familyName: data.lastName,
          },

          email: {
            email: data.email,
          },
        },
      },
    });

    return response;
  }

  async setPassword(userId: string, password: string) {
    const client = await this.getClient();
    try {
      return client.users.setPassword({
        userServiceSetPasswordRequest: {
          userId,

          newPassword: {
            password,
          },
        },
      });
    } catch (error) {
      console.error('Failed to set password:', error);
      throw new Error('Failed to set password');
    }
  }

  async deleteUser(userId: string) {
    const client = await this.getClient();

    return client.users.deleteUser({
      userServiceDeleteUserRequest: {
        userId,
      },
    });
  }

  async getUserByEmail(email: string) {
    // const client = await this.getClient();
    // const response = await client.users.listUsers({
    //   userServiceListUsersRequest: {
    //     query: {
    //       emailQuery: {
    //         email,
    //       },
    //     },
    //   },
    // });
    // if (response.result?.length === 0) {
    //   return null;
    // }
    // return response.result[0];
  }
}
