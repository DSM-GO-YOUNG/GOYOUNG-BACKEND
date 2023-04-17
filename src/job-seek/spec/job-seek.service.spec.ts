import { Test, TestingModule } from '@nestjs/testing';
import { JobSeekService } from '../job-seek.service';

describe('JobSeekService', () => {
  let service: JobSeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobSeekService],
    }).compile();

    service = module.get<JobSeekService>(JobSeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
