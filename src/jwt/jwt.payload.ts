import { ObjectId } from "mongoose"

export type Payload = {
    _id: ObjectId;
    name: string;
}