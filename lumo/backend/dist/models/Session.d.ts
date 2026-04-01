import mongoose, { Document } from "mongoose";
export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    expiresAt: Date;
    deviceInfo?: string;
    lastActive: Date;
}
export declare const Session: mongoose.Model<ISession, {}, {}, {}, mongoose.Document<unknown, {}, ISession, {}, {}> & ISession & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Session.d.ts.map