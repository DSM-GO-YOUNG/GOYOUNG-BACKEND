import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class JobSeekInfoDTO {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    job: string;

    @IsString()
    address: string;

    @IsString()
    target_id: ObjectId;

    @IsString()
    company_id: ObjectId;

    @IsString()
    user_id: ObjectId;
}

export class ReqJobSeekDTO {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    job: string;

    @IsString()
    address: string;

    @IsString()
    target_id: ObjectId;
}