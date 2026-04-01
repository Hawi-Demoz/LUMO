import mongoose, { Document } from "mongoose";
export interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    name: string;
    description?: string;
    duration?: number;
    timestamp: Date;
}
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, {}> & IActivity & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Activity.d.ts.map