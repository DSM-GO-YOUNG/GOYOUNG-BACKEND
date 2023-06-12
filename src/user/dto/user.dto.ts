import { IsBoolean, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsBoolean()
    host: boolean;

    @IsString()
    password: string;

    @IsString()
    phone: string;
}

export class UserInfoDTO {
    @IsString()
    name: string;

    @IsBoolean()
    host: boolean;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    image: string;
}

export class LoginUserDTO {
    @IsString()
    phone: string;

    @IsString()
    password: string;
}

export class UserResDTO {
    @IsString()
    id: ObjectId;

    @IsString()
    access_token: string;
}