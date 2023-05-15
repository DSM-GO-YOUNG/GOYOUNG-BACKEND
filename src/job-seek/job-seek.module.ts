import { Module } from '@nestjs/common';
import { JobSeekService } from './job-seek.service';
import { JobSeekController } from './job-seek.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSeek, JobSeekSchema } from './schema/job-seek.schema';
import { JobSeekRepository } from './job-seek.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { Company, companySchema } from 'src/company/schema/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobSeek.name, schema: JobSeekSchema }
    ]),
    MongooseModule.forFeature([
      { name: Company.name, schema: companySchema },
    ])
  ],
  controllers: [JobSeekController],
  providers: [JobSeekService, JobSeekRepository, CompanyRepository]
})
export class JobSeekModule {}
