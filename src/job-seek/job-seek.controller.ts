import { Controller } from '@nestjs/common';
import { JobSeekService } from './job-seek.service';

@Controller('job-seek')
export class JobSeekController {
  constructor(private readonly jobSeekService: JobSeekService) {}
}
