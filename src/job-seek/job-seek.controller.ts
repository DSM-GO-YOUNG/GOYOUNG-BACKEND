import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobSeekService } from './job-seek.service';
import { AuthGuard } from '@nestjs/passport';
import { ReqJobSeekDTO } from './dto/job-seek.dto';
import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Controller('job-seek')
export class JobSeekController {
  constructor(private readonly jobSeekService: JobSeekService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createJobSeek(
    @Body() reqJobSeekDto: ReqJobSeekDTO,
    @Req() req: Request,
    @Query('company') company: ObjectId
  ) {
    return await this.jobSeekService.createJobSeek(reqJobSeekDto, req.user as User, company)
  }
}
