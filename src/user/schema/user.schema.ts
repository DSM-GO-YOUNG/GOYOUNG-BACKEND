import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema({ timestamps: true })
export class User {
    _id: ObjectId;

    @Prop({ required: true, default: false })
    host: boolean;

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, trim: true, unique: true })
    phone: string;

    @Prop({ required: false })
    image: string;
}

export const userSchema = SchemaFactory.createForClass(User);