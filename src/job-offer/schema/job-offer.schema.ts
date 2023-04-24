import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId, mongo } from "mongoose";
import { Company } from "src/company/schema/company.schema";
import { User } from "src/user/schema/user.schema";

@Schema({ timestamps: true })
export class JobOffer {
    _id: ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company_id: Company;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: ObjectId;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    job: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    start_time: string;

    @Prop({ required: true })
    end_time: string;

    @Prop({ required: false })
    welfare: string;

    @Prop({ required: true })
    condition: string;

    @Prop({ required: false })
    prefer: string;
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);