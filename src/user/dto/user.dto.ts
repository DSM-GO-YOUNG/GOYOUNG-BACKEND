import { IsString, isString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;
}