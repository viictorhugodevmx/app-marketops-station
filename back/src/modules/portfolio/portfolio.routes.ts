import { Router } from "express";
import { getMyPortfolio } from "./portfolio.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getMyPortfolio);

export default router;