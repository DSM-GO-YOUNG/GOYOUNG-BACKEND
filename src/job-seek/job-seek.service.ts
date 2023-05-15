import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JobSeek } from './schema/job-seek.schema';
import { JobSeekRepository } from './job-seek.repository';
import { JobSeekInfoDTO, ReqJobSeekDTO } from './dto/job-seek.dto';
import { ObjectId } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class JobSeekService {
    constructor(
        private readonly jobSeekRepository: JobSeekRepository,
    ) {}

    public async createJobSeek(reqJobSeekDto: ReqJobSeekDTO, user: User, company_id: ObjectId): Promise<JobSeek> {
        const jobSeekInfoDto: JobSeekInfoDTO = { ...reqJobSeekDto, user_id: user._id, company_id };

        return await this.jobSeekRepository.createJobSeek(jobSeekInfoDto);
    }

    public async deleteJobSeek(job_seek_id: ObjectId, user: User) {
        const jobSeek = await this.jobSeekRepository.findOneJobSeek(job_seek_id);

        if(!jobSeek) throw new NotFoundException('Not Found JobSeek');

        if(jobSeek.user_id === user) return await this.jobSeekRepository.deleteJobSeek(job_seek_id);
        else throw new ForbiddenException()
    }
}
