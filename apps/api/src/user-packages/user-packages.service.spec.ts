import { Test, TestingModule } from '@nestjs/testing';
import { UserPackagesService } from './user-packages.service';

describe('UserPackagesService', () => {
  let service: UserPackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPackagesService],
    }).compile();

    service = module.get<UserPackagesService>(UserPackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
