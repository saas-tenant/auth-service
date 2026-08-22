import { Test, TestingModule } from '@nestjs/testing';
import { UsersV2Controller } from './users-v2.controller';
import { UsersV2Service } from './users-v2.service';

describe('UsersV2Controller', () => {
  let controller: UsersV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersV2Controller],
      providers: [UsersV2Service],
    }).compile();

    controller = module.get<UsersV2Controller>(UsersV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
