import { Test, TestingModule } from '@nestjs/testing';
import { UsersV2Service } from './users-v2.service';

describe('UsersV2Service', () => {
  let service: UsersV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersV2Service],
    }).compile();

    service = module.get<UsersV2Service>(UsersV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
