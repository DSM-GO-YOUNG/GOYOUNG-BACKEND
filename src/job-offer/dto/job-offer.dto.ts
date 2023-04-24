import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class ReqJobOfferDTO {
    @IsString()
    content: string;

    @IsString()
    job: string;

    @IsString()
    address: string;

    @IsString()
    start_time: string;

    @IsString()
    end_time: string;

    @IsString()
    welfare: string;

    @IsString()
    condition: string;

    @IsString()
    prefer: string;
}

export class JobOfferInfoDTO {
    @IsString()
    company_id: ObjectId;

    @IsString()
    user_id: ObjectId;

    @IsString()
    content: string;

    @IsString()
    job: string;

    @IsString()
    address: string;

    @IsString()
    start_time: string;

    @IsString()
    end_time: string;

    @IsString()
    welfare: string;

    @IsString()
    condition: string;

    @IsString()
    prefer: string;
}