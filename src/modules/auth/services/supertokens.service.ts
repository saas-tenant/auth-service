import { Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

@Injectable()
export class SupertokensService {
  constructor() {
    supertokens.init({
      framework: 'express',
      supertokens: {
        // Points to your self-hosted Docker container
        connectionURI:
          process.env.SUPERTOKENS_CONNECTION_URI || 'http://localhost:3567',
        apiKey: process.env.SUPERTOKENS_API_KEY || 'your_secure_api_key_here',
      },
      appInfo: {
        appName: 'SaaS Platform',
        apiDomain: process.env.API_DOMAIN || 'http://localhost:3000',
        websiteDomain: process.env.WEBSITE_DOMAIN || 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
      recipeList: [EmailPassword.init(), Session.init()],
    });
  }
}
