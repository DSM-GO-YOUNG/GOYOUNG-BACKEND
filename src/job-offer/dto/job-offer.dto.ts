import { IsString } from "class-validator";

export class CreateJobOfferDTO {
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