import mongoose, { Document } from "mongoose";
export interface IMood extends Document {
    userId: mongoose.Types.ObjectId;
    score: number;
    note?: string;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Mood: mongoose.Model<IMood, {}, {}, {}, mongoose.Document<unknown, {}, IMood, {}, {}> & IMood & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { Mood };
//# sourceMappingURL=Mood.d.ts.map