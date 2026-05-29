import { Router } from "express";
import { analyzeRisk } from "../controllers/risk.controller.js";
import { aiRateLimit } from "../middleware/rate-limit.js";

const router = Router();

router.post("/analyze", aiRateLimit, analyzeRisk);

export default router;
