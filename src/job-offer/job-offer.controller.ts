import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { AuthGuard } from '@nestjs/passport';
import { ReqJobOfferDTO } from './dto/job-offer.dto';
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
      @Body() reqJobOfferDto: ReqJobOfferDTO,
      @Req() req: Request,
      @Query('company') company: ObjectId
    ) {
      return await this.jobOfferService.createJobOffer(reqJobOfferDto, req.user as User, company);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:job_offer_id')
    async updateJobOffer(
      @Body() reqJobOfferDto: ReqJobOfferDTO,
      @Req() req: Request,
      @Param('job_offer_id') job_offer_id: ObjectId,
    ) {
      return await this.jobOfferService.updateJobOffer(reqJobOfferDto, job_offer_id, req.user as User);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:job_offer_id')
    async deleteJobOffer(
      @Req() req: Request,
      @Param('job_offer_id') job_offer_id: ObjectId,
    ) {
      await this.jobOfferService.deleteJobOffer(job_offer_id, req.user as User);
      return { statusCode: 200, message: 'Success Delete JobOffer' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/my')
    async getMyJobOffer(
      @Req() req: Request
    ) {
      return await this.jobOfferService.getMyJobOffer(req.user as User);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/:job_offer_id')
    async getJobOffer(
      @Param('job_offer_id') job_offer_id: ObjectId,
    ) {
      return await this.jobOfferService.getJobOffer(job_offer_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getAllJobOffer() {
      return await this.jobOfferService.getAllJobOffer();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/company/:company_id')
    async getJobOfferByCompany(
      @Param('company_id') company_id: ObjectId,
    ) {
      return await this.jobOfferService.getJobOfferByCompany(company_id);
    }

}
