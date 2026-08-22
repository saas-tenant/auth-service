import { Injectable } from '@nestjs/common';
import { CreateUsersV2Dto } from './dto/create-users-v2.dto';
import { UpdateUsersV2Dto } from './dto/update-users-v2.dto';

@Injectable()
export class UsersV2Service {
  create(createUsersV2Dto: CreateUsersV2Dto) {
    return 'This action adds a new usersV2';
  }

  findAll() {
    return `This action returns all usersV2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersV2`;
  }

  update(id: number, updateUsersV2Dto: UpdateUsersV2Dto) {
    return `This action updates a #${id} usersV2`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersV2`;
  }
}
