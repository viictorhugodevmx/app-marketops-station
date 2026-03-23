import { Router } from "express";
import { create, getMyOrders } from "./orders.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getMyOrders);

export default router;