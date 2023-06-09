import { IsString, isString } from "class-validator";
import { ObjectId } from "mongoose";

export class ReqCompanyDTO {
    @IsString()
    name: string;

    @IsString()
    kind: string;

    @IsString()
    explanation: string;

    @IsString()
    address: string;
}

export class RegisterCompanyDTO {
    @IsString()
    name: string;

    @IsString()
    kind: string;

    @IsString()
    explanation: string;

    @IsString()
    address: string;

    @IsString()
    image: string;

    @IsString()
    user_id: ObjectId;    
}

export class updateCompanyDTO {
    @IsString()
    name: string;

    @IsString()
    kind: string;

    @IsString()
    explanation: string;

    @IsString()
    address: string;

    @IsString()
    image: string;
}