import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Controller('/job-offer')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/:job_offer_id/application')
  async applyCompany(
    @Body('content') content: string,
    @Req() req: Request,
    @Param('job_offer_id') job_offer_id: ObjectId,
  ) {
    return await this.applicationService.applyCompany(req.user as User, job_offer_id, content);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:job_offer_id/application')
  async cancelApplyCompany(
    @Req() req: Request,
    @Param('job_offer_id') job_offer_id: ObjectId,
  ) {
    await this.applicationService.cancelApplyCompany(req.user as User, job_offer_id);
    return { statusCode: 200, message: 'Success Cancel Apply' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:job_offer_id/admin')
  async getApplicationByOffer(
    @Param('job_offer_id') job_offer_id: ObjectId,
  ) {
    return this.applicationService.getApplicationByOffer(job_offer_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/application/:application_id/admin')
  async answerApplication(
    @Req() req: Request,
    @Body('result') result: string,
    @Param('application_id') application_id: ObjectId,
  ) {
    return this.applicationService.answerApplication(req.user as User, application_id, result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/application/:application_id/admin')
  async getApplicationById(
    @Param('application_id') application_id: ObjectId,
  ) {
    return this.applicationService.getApplicationById(application_id);
  }

}
