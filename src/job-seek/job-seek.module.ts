import { Module } from '@nestjs/common';
import { JobSeekService } from './job-seek.service';
import { JobSeekController } from './job-seek.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeek, JobSeekSchema } from './schema/job-seek.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobSeek.name, schema: JobSeekSchema }
    ])
  ],
  controllers: [JobSeekController],
  providers: [JobSeekService]
})
export class JobSeekModule {}
