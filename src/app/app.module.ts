import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { AuthModule } from 'src/auth/auth.module';
import { JobOfferModule } from 'src/job-offer/job-offer.module';
import { JobSeekModule } from 'src/job-seek/job-seek.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    CompanyModule,
    JobOfferModule,
    JobSeekModule
  ],
})
export class AppModule {}
