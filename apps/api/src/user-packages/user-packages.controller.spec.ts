import { Test, TestingModule } from '@nestjs/testing';
import { UserPackagesController } from './user-packages.controller';
import { UserPackagesService } from './user-packages.service';

describe('UserPackagesController', () => {
  let controller: UserPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPackagesController],
      providers: [UserPackagesService],
    }).compile();

    controller = module.get<UserPackagesController>(UserPackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
