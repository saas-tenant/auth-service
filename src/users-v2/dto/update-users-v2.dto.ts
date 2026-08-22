import { PartialType } from '@nestjs/swagger';
import { CreateUsersV2Dto } from './create-users-v2.dto';

export class UpdateUsersV2Dto extends PartialType(CreateUsersV2Dto) {}
