import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error as SuperTokensError } from 'supertokens-node';

@Catch(SuperTokensError)
export class SuperTokensExceptionFilter implements ExceptionFilter {
  handler: any;

  constructor() {
    // this.handler = SuperTokensError.;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Pass the error to SuperTokens error handler
    this.handler(exception, request, response, (err: any) => {
      if (err) {
        response.status(500).json({ message: 'Internal Server Error' });
      }
    });
  }
}
