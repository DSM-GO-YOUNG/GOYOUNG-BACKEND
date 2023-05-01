import { Module } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { JobOfferController } from './job-offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOffer, jobOfferSchema } from './schema/job-offer.schema';
import { JobOfferRepository } from './job.offer-repository';
import { CompanyRepository } from 'src/company/company.repository';
import { Company, companySchema } from 'src/company/schema/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobOffer.name, schema: jobOfferSchema },
    ]),
    MongooseModule.forFeature([
      { name: Company.name, schema: companySchema },
    ])
  ],
  controllers: [JobOfferController],
  providers: [JobOfferService, JobOfferRepository, CompanyRepository]
})
export class JobOfferModule {}
