import { Body, Controller, Delete, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:job_seek_id')
  async deleteJobSeek(
    @Req() req: Request,
    @Param('job_seek_id') job_seek_id: ObjectId
  ) {
    return await this.jobSeekService.deleteJobSeek(job_seek_id, req.user as User);
  }
}
