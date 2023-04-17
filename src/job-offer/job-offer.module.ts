import { Module } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { JobOfferController } from './job-offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOffer, JobOfferSchema } from './schema/job-offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobOffer.name, schema: JobOfferSchema },
    ])
  ],
  controllers: [JobOfferController],
  providers: [JobOfferService]
})
export class JobOfferModule {}
