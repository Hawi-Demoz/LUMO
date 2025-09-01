"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./logger");
const MONGODB_URI = process.env['MONGODB_URI'] ||
    "mongodb://127.0.0.1:27017/lumo";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        logger_1.logger.info("Connected to MongoDB");
    }
    catch (error) {
        logger_1.logger.error("MongoDB connection error:", error);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map