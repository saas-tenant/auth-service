import { SuperTokensAuthGuard } from '@/auth/auth.guard';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(SuperTokensAuthGuard)
  async getMyProfile(@Req() req: any) {
    // req.session is populated by SuperTokens verifySession() inside AuthGuard
    const session: SessionContainer = req.session;
    const userId = session.getUserId();

    return {
      status: 'OK',
      userId,
      message: 'This is a protected route! Session is valid.',
    };
  }
}
