import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('ok')
  getHealth() {
    return { status: 'ok' };
  }
}
