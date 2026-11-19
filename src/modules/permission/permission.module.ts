import { Module } from '@nestjs/common';
import { OpenFgaService } from './permission.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [OpenFgaService],
  exports: [OpenFgaService],
})
export class OpenFgaModule {}
