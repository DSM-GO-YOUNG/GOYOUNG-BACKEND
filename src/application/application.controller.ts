import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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
    console.log(content);
    return await this.applicationService.applyCompany(req.user as User, job_offer_id, content);
  }
}
