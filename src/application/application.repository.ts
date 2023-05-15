import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application } from "./schema/application.schema";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { ApplicationCompanyDTO, ApplicationInfoDTO } from "./dto/application.dto";
import { JobOffer } from "src/job-offer/schema/job-offer.schema";

@Injectable()
export class ApplicationRepository {
    constructor(
        @InjectModel(Application.name)
        private applicationModel: Model<Application>
    ) {}

    async applyCompany(applicationCompanyDto: ApplicationCompanyDTO): Promise<Application> {
        const newApplication = new this.applicationModel(applicationCompanyDto);
        return await newApplication.save();
    }

    async getApplication(user: User, job_offer_id: ObjectId): Promise<Application> {
        return await this.applicationModel.findOne({ 
            user_id: user._id, 
            job_offer_id: job_offer_id 
        });
    }

    async cancelApplyCompany(user: User, job_offer_id: ObjectId) {
        return await this.applicationModel.deleteOne({
            user_id: user._id,
            job_offer_id: job_offer_id
        })
    }

    async getApplicationByOffer(job_offer_id: ObjectId): Promise<Application[]> {
        return await this.applicationModel.find({ job_offer_id });
    }

    async getApplicationById(application_id: ObjectId): Promise<Application> {
        return await this.applicationModel.findById(application_id);
    }

    public async answerApplication(application_id: ObjectId, result: string): Promise<Application> {
        await this.applicationModel.findByIdAndUpdate(application_id, { result });
        return this.applicationModel.findById(application_id);
    }
}