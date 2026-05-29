import { Router } from "express";
import aiRoutes from "./ai.routes.js";
import healthRoutes from "./health.routes.js";
import riskRoutes from "./risk.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/ai", aiRoutes);
router.use("/risk", riskRoutes);

export default router;
