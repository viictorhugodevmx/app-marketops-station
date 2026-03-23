import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import marketRoutes from "./modules/market/market.routes";
import ordersRoutes from "./modules/orders/orders.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/orders", ordersRoutes);

export default app;