import { Request, Response } from "express";
import "../middleware/auth";
export declare const createChatSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSessionHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getChatSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getChatHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chat.d.ts.map