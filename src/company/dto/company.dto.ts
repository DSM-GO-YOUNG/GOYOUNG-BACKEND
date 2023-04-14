import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateCompanyDTO {
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
    user_id: ObjectId;    
}