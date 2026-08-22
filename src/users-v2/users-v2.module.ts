import { Module } from '@nestjs/common';
import { UsersV2Service } from './users-v2.service';
import { UsersV2Controller } from './users-v2.controller';

@Module({
  controllers: [UsersV2Controller],
  providers: [UsersV2Service],
})
export class UsersV2Module {}
