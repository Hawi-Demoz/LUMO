import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI =
process.env.MONGODB_URI ||
"mongodb+srv://hawipeter1_db_user:FIgnw2mVRkpIV1aL@lumo.krws5zk.mongodb.net/?retryWrites=true&w=majority&appName=lumo";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};