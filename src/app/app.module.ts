import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from 'src/company/company.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    CompanyModule
  ],
})
export class AppModule {}
