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
    company_id: ObjectId;

    @IsString()
    user_id: ObjectId;
}