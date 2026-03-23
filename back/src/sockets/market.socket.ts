import { WebSocketServer } from "ws";
import { setWSS } from "./socket.manager";

export const initMarketSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  setWSS(wss);

  console.log("📡 WebSocket server started");

  wss.on("connection", (ws) => {
    console.log("🔌 Client connected");

    let price = 50000;

    const interval = setInterval(() => {
      price += (Math.random() - 0.5) * 100;

      ws.send(
        JSON.stringify({
          type: "MARKET_UPDATE",
          symbol: "BTC",
          price: Number(price.toFixed(2)),
        })
      );
    }, 2000);

    ws.on("close", () => {
      console.log("❌ Client disconnected");
      clearInterval(interval);
    });
  });
};