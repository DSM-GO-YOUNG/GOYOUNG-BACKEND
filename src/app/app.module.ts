import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { AuthModule } from 'src/auth/auth.module';
import { JobOfferModule } from 'src/job-offer/job-offer.module';
import { JobSeekModule } from 'src/job-seek/job-seek.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/shared/exception/exception.filter';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    CompanyModule,
    JobOfferModule,
    JobSeekModule,
    ApplicationModule
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter}]
})
export class AppModule {}
