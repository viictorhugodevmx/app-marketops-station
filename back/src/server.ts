import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { initMarketSocket } from "./sockets/market.socket";
import http from "http";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  initMarketSocket(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();