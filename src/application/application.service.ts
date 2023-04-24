import { ConflictException, Injectable } from '@nestjs/common';
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
        const application = await this.applicationRepository.findApplication(user, job_offer_id);
        if(application) throw new ConflictException('already apply to this Company');
        
        const applicationCompanyDto: ApplicationCompanyDTO = { user_id: user._id, job_offer_id, content };
        return await this.applicationRepository.applyCompany(applicationCompanyDto);
    }
}
