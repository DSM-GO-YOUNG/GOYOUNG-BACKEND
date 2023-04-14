import { IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;
}

export class LoginUserDTO {
    @IsString()
    phone: string;

    @IsString()
    password: string;
}

export class UserResDTO {
    @IsString()
    _id: ObjectId;

    @IsString()
    access_token: string;
}