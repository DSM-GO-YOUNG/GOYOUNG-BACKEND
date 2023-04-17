import { Test, TestingModule } from '@nestjs/testing';
import { JobSeekController } from '../job-seek.controller';
import { JobSeekService } from '../job-seek.service';

describe('JobSeekController', () => {
  let controller: JobSeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSeekController],
      providers: [JobSeekService],
    }).compile();

    controller = module.get<JobSeekController>(JobSeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
