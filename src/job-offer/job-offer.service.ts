import { Injectable } from '@nestjs/common';
import { JobOfferRepository } from './job.offer-repository';
import { CreateJobOfferDTO } from './dto/job-offer.dto';
import { JobOffer } from './schema/job-offer.schema';

@Injectable()
export class JobOfferService {
    constructor(
        private readonly jobOfferRepository: JobOfferRepository
    ) {}

    public async createJobOffer(createJobOfferDto: CreateJobOfferDTO): Promise<JobOffer> {
        return 
    }
}
