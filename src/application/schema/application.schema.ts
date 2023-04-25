import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { JobOffer } from "src/job-offer/schema/job-offer.schema";
import { User } from "src/user/schema/user.schema";

@Schema({ timestamps: true })
export class Application {
    _id: ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: JobOffer.name })
    job_offer_id: JobOffer;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, enum: ['accept', 'fail', 'ongoing'], default: 'ongoing' })
    result: string;
}

export const applicationSchema = SchemaFactory.createForClass(Application);