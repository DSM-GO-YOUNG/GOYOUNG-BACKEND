import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JobOffer } from "./schema/job-offer.schema";
import { Model, ObjectId } from "mongoose";
import { JobOfferInfoDTO, ReqJobOfferDTO } from "./dto/job-offer.dto";
import { User } from "src/user/schema/user.schema";

@Injectable()
export class JobOfferRepository {
    constructor(
        @InjectModel(JobOffer.name)
        private jobOfferModel: Model<JobOffer>
    ) {}

    async createJobOffer(JobOfferInfoDto: JobOfferInfoDTO): Promise<JobOffer> {
        const newJobOffer = new this.jobOfferModel(JobOfferInfoDto);
        return newJobOffer.save();
    }

    async updateJobOffer(reqJobOfferDto: ReqJobOfferDTO, job_offer_id: ObjectId): Promise<JobOffer> {
        await this.jobOfferModel.findByIdAndUpdate({_id: job_offer_id}, reqJobOfferDto);
        return this.jobOfferModel.findById(job_offer_id);
    }

    async deleteJobOffer(job_offer_id: ObjectId) {
        return await this.jobOfferModel.deleteOne({ _id: job_offer_id });
    }

    async getJobOfferById(job_offer_id: ObjectId): Promise<JobOffer> {
        return await this.jobOfferModel.findById(job_offer_id);
    }

    async getAllJobOffer(): Promise<JobOffer[]> {
        return await this.jobOfferModel.find();
    }

    async getJobOfferByCompany(company_id: ObjectId): Promise<JobOffer[]> {
        return await this.jobOfferModel.find({ company_id });
    }
}