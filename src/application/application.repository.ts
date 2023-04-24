import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Application } from "./schema/application.schema";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { ApplicationCompanyDTO, ApplicationInfoDTO } from "./dto/application.dto";

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

    async findApplication(user: User, job_offer_id: ObjectId): Promise<Application> {
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
}