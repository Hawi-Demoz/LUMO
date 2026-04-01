import mongoose, { Document } from "mongoose";
export interface IChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    metadata?: {
        technique: string;
        goal: string;
        progress: any[];
    };
}
export interface IChatSession extends Document {
    sessionId: string;
    messages: IChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const ChatSession: mongoose.Model<IChatSession, {}, {}, {}, mongoose.Document<unknown, {}, IChatSession, {}, {}> & IChatSession & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=chat.d.ts.map