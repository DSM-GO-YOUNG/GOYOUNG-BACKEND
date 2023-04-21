import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateJobOfferDTO } from './dto/job-offer.dto';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';

@Controller('job-offer')
export class JobOfferController {
  constructor(
    private readonly jobOfferService: JobOfferService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async createJobOffer(
      @Body() createJobOfferDto: CreateJobOfferDTO,
      @Req() req: Request,
      @Param() company_id: ObjectId
    ) {
      await this.jobOfferService.createJobOffer(createJobOfferDto, req.user as User, company_id);

    }
}
