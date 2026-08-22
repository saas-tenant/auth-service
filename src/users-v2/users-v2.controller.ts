import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersV2Service } from './users-v2.service';
import { CreateUsersV2Dto } from './dto/create-users-v2.dto';
import { UpdateUsersV2Dto } from './dto/update-users-v2.dto';

@Controller({ path: 'users', version: '2' })
export class UsersV2Controller {
  constructor(private readonly usersV2Service: UsersV2Service) {}

  @Post()
  create(@Body() createUsersV2Dto: CreateUsersV2Dto) {
    return this.usersV2Service.create(createUsersV2Dto);
  }

  @Get()
  findAll() {
    return this.usersV2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersV2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersV2Dto: UpdateUsersV2Dto) {
    return this.usersV2Service.update(+id, updateUsersV2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersV2Service.remove(+id);
  }
}
