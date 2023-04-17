import { Module } from '@nestjs/common';
import { JobSeekService } from './job-seek.service';
import { JobSeekController } from './job-seek.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeek } from './schema/job-seek.schema';
import { JobOfferSchema } from 'src/job-offer/schema/job-offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobSeek.name, schema: JobOfferSchema }
    ])
  ],
  controllers: [JobSeekController],
  providers: [JobSeekService]
})
export class JobSeekModule {}
