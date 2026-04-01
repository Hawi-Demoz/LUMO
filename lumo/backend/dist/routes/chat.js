"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_1 = require("../controllers/chat");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.auth);
router.post("/sessions", chat_1.createChatSession);
router.get("/sessions/:sessionId", chat_1.getChatSession);
router.post("/sessions/:sessionId/messages", chat_1.sendMessage);
router.get("/sessions/:sessionId/history", chat_1.getChatHistory);
exports.default = router;
//# sourceMappingURL=chat.js.map