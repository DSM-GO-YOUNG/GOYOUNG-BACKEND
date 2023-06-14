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
        const company = await this.companyRepository.getCompanyById(company_id);

        if(String(company.user_id) !== String(user._id)) throw new ForbiddenException('Not Host of the Company');

        const JobOfferInfoDto: JobOfferInfoDTO = { ...reqJobOfferDto, user_id: user._id, company_id };

        return await this.jobOfferRepository.createJobOffer(JobOfferInfoDto);
    }

    public async updateJobOffer(reqJobOfferDto: ReqJobOfferDTO, job_offer_id: ObjectId, user: User): Promise<JobOffer> {
        const jobOffer = await this.jobOfferRepository.getJobOfferById(job_offer_id);

        if(!jobOffer) throw new NotFoundException('Not Found Job Offer');
        else if(String(jobOffer.user_id) === String(user._id)) return await this.jobOfferRepository.updateJobOffer(reqJobOfferDto, job_offer_id);
        else throw new ForbiddenException;
    }

    public async deleteJobOffer(job_offer_id: ObjectId, user: User) {
        const jobOffer = await this.jobOfferRepository.getJobOfferById(job_offer_id);
    
        if(!jobOffer) throw new NotFoundException('Not Found Job Offer');
        else if(String(jobOffer.user_id) === String(user._id)) return this.jobOfferRepository.deleteJobOffer(job_offer_id);
        else throw new ForbiddenException;
    }

    public async getJobOffer(job_offer_id: ObjectId): Promise<JobOffer> {
        const jobOffer =  await this.jobOfferRepository.getJobOfferById(job_offer_id);
        if(!jobOffer) throw new NotFoundException('Not Found Job Offer');
        return jobOffer;
    }

    public async getAllJobOffer(): Promise<JobOffer[]> {
        return await this.jobOfferRepository.getAllJobOffer();
    }

    public async getJobOfferByCompany(company_id: ObjectId): Promise<JobOffer[]> {
        return await this.jobOfferRepository.getJobOfferByCompany(company_id);
    }

    public async getMyJobOffer(user: User): Promise<JobOffer[]> {
        return await this.jobOfferRepository.getMyJobOffer(user._id);
    }
}
