import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { Application } from './schema/application.schema';
import { ApplicationCompanyDTO } from './dto/application.dto';

@Injectable()
export class ApplicationService {
    constructor(
        private readonly applicationRepository: ApplicationRepository
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
        else throw new ForbiddenException();
    }

    public async getApplicationByOffer(job_offer_id: ObjectId): Promise<Application[]> {
        return await this.applicationRepository.getApplicationByOffer(job_offer_id);
    }

    public async acceptApplication(user: User, application_id: ObjectId, result: string): Promise<Application> {
        const application = await this.applicationRepository.getApplicationById(application_id);
        if(!application) throw new BadRequestException('Not apply to this Company');
        
        if(String(application.user_id) === String(user._id)) {
            return await this.applicationRepository.acceptApplication(application_id, result);
        } else throw new ForbiddenException;
    }

    public async getApplicationById(application_id: ObjectId): Promise<Application> {
        return await this.applicationRepository.getApplicationById(application_id);
    }
}
