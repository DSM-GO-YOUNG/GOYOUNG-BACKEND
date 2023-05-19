import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, companySchema } from './schema/company.schema';
import { CompanyRepository } from './company.repository';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/shared/multerOptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: companySchema },
    ]),
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory
    })
  ],
  providers: [CompanyService, CompanyRepository],
  controllers: [CompanyController]
})
export class CompanyModule {}
