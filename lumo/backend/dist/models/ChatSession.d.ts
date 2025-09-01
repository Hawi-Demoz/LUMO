import { Document, Types } from "mongoose";
export interface IChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    metadata?: {
        analysis?: any;
        currentGoal?: string | null;
        progress?: {
            emotionalState?: string;
            riskLevel?: number;
        };
    };
}
export interface IChatSession extends Document {
    _id: Types.ObjectId;
    sessionId: string;
    userId: Types.ObjectId;
    startTime: Date;
    status: "active" | "completed" | "archived";
    messages: IChatMessage[];
}
export declare const ChatSession: import("mongoose").Model<IChatSession, {}, {}, {}, Document<unknown, {}, IChatSession, {}, {}> & IChatSession & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=ChatSession.d.ts.map