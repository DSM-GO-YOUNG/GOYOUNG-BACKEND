import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";

@Schema({ timestamps: true })
export class Company {
    _id: ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    kind: string;

    @Prop({ required: true })
    explanation: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_id: User;
}

export const companySchema = SchemaFactory.createForClass(Company);