import { WebSocketServer } from "ws";

let wss: WebSocketServer;

export const setWSS = (server: WebSocketServer) => {
  wss = server;
};

export const broadcast = (data: any) => {
  if (!wss) return;

  wss.clients.forEach((client: any) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
};