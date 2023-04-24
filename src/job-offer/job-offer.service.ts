import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JobOfferRepository } from './job.offer-repository';
import { ReqJobOfferDTO, JobOfferInfoDTO } from './dto/job-offer.dto';
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

    public async createJobOffer(reqJobOfferDto: ReqJobOfferDTO, user: User, company_id: ObjectId): Promise<JobOffer> {
        const company = await this.companyRepository.findCompanyById(company_id);

        if(company.user_id !== user._id) throw new ForbiddenException('Not Host of the Company');

        const JobOfferInfoDto: JobOfferInfoDTO = { ...reqJobOfferDto, user_id: user._id, company_id };

        return await this.jobOfferRepository.createJobOffer(JobOfferInfoDto);
    }

    public async updateJobOffer(reqJobOfferDto: ReqJobOfferDTO, job_offer_id: ObjectId, user: User): Promise<JobOffer> {
        const jobOffer = await this.jobOfferRepository.findJobOfferById(job_offer_id);

        if(!jobOffer) throw new NotFoundException('Not Found Job Offer');
        else if(String(jobOffer.user_id) == String(user._id)) return await this.jobOfferRepository.updateJobOffer(reqJobOfferDto, job_offer_id);
        else throw ForbiddenException;
    }

    public async deleteJobOffer(job_offer_id: ObjectId, user: User) {
        const jobOffer = await this.jobOfferRepository.findJobOfferById(job_offer_id);
    
        if(!jobOffer) throw new NotFoundException('Not Found Job Offer');
        else if(String(jobOffer.user_id) == String(user._id)) return this.jobOfferRepository.deleteJobOffer(job_offer_id);
        else throw ForbiddenException;
    }
}
