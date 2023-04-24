import { Body, Controller, Delete, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
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
}
