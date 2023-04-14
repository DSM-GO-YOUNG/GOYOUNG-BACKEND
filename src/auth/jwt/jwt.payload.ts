import { ObjectId } from "mongoose"

export type Payload = {
    id: ObjectId;
    host: boolean;
}