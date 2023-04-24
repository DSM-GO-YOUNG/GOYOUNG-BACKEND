import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, applicationSchema } from './schema/application.schema';
import { ApplicationRepository } from './application.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: applicationSchema },
    ])
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository]
})
export class ApplicationModule {}
