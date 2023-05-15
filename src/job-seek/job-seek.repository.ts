import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JobSeek } from "./schema/job-seek.schema";
import { Model, ObjectId } from "mongoose";
import { JobSeekInfoDTO } from "./dto/job-seek.dto";

@Injectable()
export class JobSeekRepository {
    constructor(
        @InjectModel(JobSeek.name)
        private jobSeekModel: Model<JobSeek>
    ) {}

    async createJobSeek(jobSeekInfoDto: JobSeekInfoDTO): Promise<JobSeek> {
        const newJobSeek = new this.jobSeekModel(jobSeekInfoDto);
        return newJobSeek.save();
    }

    async findOneJobSeek(job_seek_id: ObjectId): Promise<JobSeek> {
        return this.jobSeekModel.findById(job_seek_id);
    }

    async findAllJobSeek(job_seek_id: ObjectId): Promise<JobSeek[]> {
        return this.jobSeekModel.find();
    }
}