import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class ApplicationCompanyDTO {
    @IsString()
    user_id: ObjectId;

    @IsString()
    job_offer_id: ObjectId;

    @IsString()
    content: string;
}

export class ApplicationInfoDTO {
    @IsString()
    user_id: ObjectId;

    @IsString()
    job_offer_id: ObjectId;
}