import { Router } from "express";
import { aiChat, aiChatStream, aiStatus } from "../controllers/ai.controller.js";
import { aiRateLimit } from "../middleware/rate-limit.js";

const router = Router();

router.get("/status", aiStatus);
router.post("/chat", aiRateLimit, aiChat);
router.post("/chat/stream", aiRateLimit, aiChatStream);

export default router;
