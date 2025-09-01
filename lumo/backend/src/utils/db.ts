import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI =
process.env['MONGODB_URI'] ||
"mongodb://127.0.0.1:27017/lumo";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    // Do not exit in dev; allow server to start so health/checks work
  }
};