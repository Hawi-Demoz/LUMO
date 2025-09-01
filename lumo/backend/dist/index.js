"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("inngest/express");
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const auth_1 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const mood_1 = __importDefault(require("./routes/mood"));
const activity_1 = __importDefault(require("./routes/activity"));
const db_1 = require("./utils/db");
const client_1 = require("./inngest/client");
const functions_1 = require("./inngest/functions");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/inngest", (0, express_2.serve)({ client: client_1.inngest, functions: functions_1.functions }));
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});
app.use("/auth", auth_1.default);
app.use("/chat", chat_1.default);
app.use("/api/mood", mood_1.default);
app.use("/api/activity", activity_1.default);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        const PORT = parseInt(process.env['PORT'] || '3001', 10);
        app.listen(PORT, () => {
            logger_1.logger.info(`Server is running on port ${PORT}`);
            logger_1.logger.info(`Inngest endpoint available at http://localhost:${PORT}/api/inngest`);
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map