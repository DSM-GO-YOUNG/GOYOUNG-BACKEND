import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JobOffer } from "./schema/job-offer.schema";
import { Model } from "mongoose";
import { CreateJobOfferDTO } from "./dto/job-offer.dto";

@Injectable()
export class JobOfferRepository {
    constructor(
        @InjectModel(JobOffer.name)
        private jobOfferModel: Model<JobOffer>
    ) {}

    async createJobOffer(createJobOfferDto: CreateJobOfferDTO): Promise<JobOffer> {
        const newJobOffer = new this.jobOfferModel(createJobOfferDto,);
        return newJobOffer.save();
    }
}