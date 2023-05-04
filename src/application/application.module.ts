import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, applicationSchema } from './schema/application.schema';
import { ApplicationRepository } from './application.repository';
import { JobOffer, jobOfferSchema } from 'src/job-offer/schema/job-offer.schema';
import { JobOfferRepository } from 'src/job-offer/job.offer-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: applicationSchema },
    ]),
    MongooseModule.forFeature([
      { name: JobOffer.name, schema: jobOfferSchema },
    ])
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository, JobOfferRepository]
})
export class ApplicationModule {}
