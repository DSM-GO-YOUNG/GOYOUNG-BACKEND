import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
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
    await this.jobSeekService.deleteJobSeek(job_seek_id, req.user as User);
    return { statusCode: 200, message: 'Success Delete JobSeek' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:job_seek_id')
  async findOneJobSeek(
    @Param('job_seek_id') job_seek_id: ObjectId
  ) {
    return await this.jobSeekService.findOneJobSeek(job_seek_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:job_seek_id/result')
  async answerJobSeek(
    @Body('result') result: string,
    @Req() req: Request,
    @Param('job_seek_id') job_seek_id: ObjectId
  ) {
    return await this.jobSeekService.answerJobSeek(job_seek_id, result, req.user as User);
  }
}
