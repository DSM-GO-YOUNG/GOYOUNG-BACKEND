import { ForbiddenException, Injectable } from '@nestjs/common';
import { JobOfferRepository } from './job.offer-repository';
import { CreateJobOfferDTO, JobOfferInfoDTO } from './dto/job-offer.dto';
import { JobOffer } from './schema/job-offer.schema';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { CompanyRepository } from 'src/company/company.repository';

@Injectable()
export class JobOfferService {
    constructor(
        private readonly jobOfferRepository: JobOfferRepository,
        private readonly companyRepository: CompanyRepository
    ) {}

    public async createJobOffer(createJobOfferDto: CreateJobOfferDTO, user: User, company_id: ObjectId): Promise<JobOffer> {
        const company = await this.companyRepository.findCompanyById(company_id);

        if(company.user_id !== user._id) throw new ForbiddenException('Not Host of the Company');

        const JobOfferInfoDto: JobOfferInfoDTO = { ...createJobOfferDto, user_id: user._id, company_id };

        return await this.jobOfferRepository.createJobOffer(JobOfferInfoDto);
    }
}
