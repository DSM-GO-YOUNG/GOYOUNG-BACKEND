import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Company } from "src/company/schema/company.schema";
import { User } from "src/user/schema/user.schema";

@Schema({ timestamps: true })
export class JobSeek {
    _id: ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    job: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, enum: ['accept', 'fail', 'ongoing'], default: 'ongoing' })
    result: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    target_id: ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company_id: Company;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: User;
}

export const JobSeekSchema = SchemaFactory.createForClass(JobSeek);
