import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { Application } from './schema/application.schema';
import { ApplicationCompanyDTO } from './dto/application.dto';
import { JobOfferRepository } from 'src/job-offer/job.offer-repository';

@Injectable()
export class ApplicationService {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
        private readonly jobOfferRepository: JobOfferRepository
    ) {}

    public async applyCompany(user: User, job_offer_id: ObjectId, content: string): Promise<Application> {
        const application = await this.applicationRepository.getApplication(user, job_offer_id);
        if(application) throw new ConflictException('already apply to this Company');

        const applicationCompanyDto: ApplicationCompanyDTO = { user_id: user._id, job_offer_id, content };
        return await this.applicationRepository.applyCompany(applicationCompanyDto);
    }

    public async cancelApplyCompany(user: User, job_offer_id: ObjectId) {
        const application = await this.applicationRepository.getApplication(user,  job_offer_id);
        if(!application) throw new BadRequestException('Not apply to this Company');

        if(String(application.user_id) === String(user._id)) return await this.applicationRepository.cancelApplyCompany(user, job_offer_id);
    }

    public async getApplicationByOffer(job_offer_id: ObjectId): Promise<Application[]> {
        return await this.applicationRepository.getApplicationByOffer(job_offer_id);
    }

    public async acceptApplication(user: User, application_id: ObjectId, result: string): Promise<Application> {
        const jobOffer = await this.applicationRepository.getApplicationById(application_id);
        if(!jobOffer) throw new NotFoundException('Not Found this Application');
        
        const offerHost = await this.jobOfferRepository.getJobOfferById(Object(jobOffer.job_offer_id.user_id));
        
        if(String(offerHost.user_id) === String(user._id)) {
            return await this.applicationRepository.acceptApplication(application_id, result);
        } else throw new ForbiddenException;
    }

    public async getApplicationById(application_id: ObjectId): Promise<Application> {
        const jobOffer = await this.applicationRepository.getApplicationById(application_id);
        if(!jobOffer) throw new NotFoundException('Not Found this Application');

        return jobOffer;
    }
}
