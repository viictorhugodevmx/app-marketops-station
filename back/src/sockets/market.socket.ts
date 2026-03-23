import { WebSocketServer } from "ws";

export const initMarketSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  console.log("📡 WebSocket server started");

  wss.on("connection", (ws) => {
    console.log("🔌 Client connected");

    let price = 50000;

    const interval = setInterval(() => {
      // Simulación de precio
      price += (Math.random() - 0.5) * 100;

      ws.send(
        JSON.stringify({
          symbol: "BTC",
          price: Number(price.toFixed(2)),
          timestamp: new Date(),
        })
      );
    }, 2000);

    ws.on("close", () => {
      console.log("❌ Client disconnected");
      clearInterval(interval);
    });
  });
};