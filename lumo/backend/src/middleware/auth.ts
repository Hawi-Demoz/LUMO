import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User";

const getSessionModel = () => {
  try {
    return mongoose.model("Session");
  } catch {
    const { Session } = require("../models/Session");
    return Session;
  }
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(
      token,
      process.env['JWT_SECRET'] || "your-secret-key"
    ) as any;

    if (mongoose.connection.readyState !== 1) {
      if (!decoded.userId || !decoded.email || !decoded.name) {
        return res.status(401).json({ message: "Invalid authentication token" });
      }

      req.user = {
        _id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      };
      next();
      return;
    }

    const Session = getSessionModel();
    const activeSession = await Session.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!activeSession) {
      return res.status(401).json({ message: "Session expired or invalid" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      if (!decoded.userId || !decoded.email || !decoded.name) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = {
        _id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      };
      next();
      return;
    }

    req.user = user;
    await Session.updateOne({ token }, { $set: { lastActive: new Date() } });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};