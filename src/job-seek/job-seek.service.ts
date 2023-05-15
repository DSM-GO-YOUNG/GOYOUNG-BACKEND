import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JobSeek } from './schema/job-seek.schema';
import { JobSeekRepository } from './job-seek.repository';
import { JobSeekInfoDTO, ReqJobSeekDTO } from './dto/job-seek.dto';
import { ObjectId } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { CompanyRepository } from 'src/company/company.repository';

@Injectable()
export class JobSeekService {
    constructor(
        private readonly jobSeekRepository: JobSeekRepository,
        private readonly companyRepository: CompanyRepository
    ) {}

    public async createJobSeek(reqJobSeekDto: ReqJobSeekDTO, user: User, company_id: ObjectId): Promise<JobSeek> {
        const company = await this.companyRepository.getCompanyById(company_id);

        if(String(company.user_id) !== String(user._id)) throw new ForbiddenException('Not Host of the Company');

        const jobSeekInfoDto: JobSeekInfoDTO = { ...reqJobSeekDto, user_id: user._id, company_id };

        return await this.jobSeekRepository.createJobSeek(jobSeekInfoDto);
    }

    public async deleteJobSeek(job_seek_id: ObjectId, user: User) {
        const jobSeek = await this.jobSeekRepository.findOneJobSeek(job_seek_id);

        if(!jobSeek) throw new NotFoundException('Not Found JobSeek');

        if(String(jobSeek.user_id) === String(user._id)) return await this.jobSeekRepository.deleteJobSeek(job_seek_id);
        else throw new ForbiddenException();
    }

    public async findOneJobSeek(job_seek_id: ObjectId): Promise<JobSeek> {
        const jobSeek = await this.jobSeekRepository.findOneJobSeek(job_seek_id);

        if(!jobSeek) throw new NotFoundException('Not Found JobSeek');
        
        return jobSeek;
    }

    public async answerJobSeek(job_seek_id: ObjectId, result: string, user: User): Promise<JobSeek> {
        const jobSeek = await this.jobSeekRepository.findOneJobSeek(job_seek_id);

        if(!jobSeek) throw new NotFoundException('Not Found JobSeek');
        
        if(String(jobSeek.target_id) === String(user._id)) return await this.jobSeekRepository.answerJobSeek(job_seek_id, result);
        else throw new ForbiddenException();
    }
}
