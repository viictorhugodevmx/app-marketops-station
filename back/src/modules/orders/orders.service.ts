import { db } from "../../config/db";
import { Order } from "../../types/order";
import { broadcast } from "../../sockets/socket.manager";

const ordersCollection = db.collection<Order>("orders");

export const createOrder = async (order: Order) => {
  const newOrder: Order = {
    ...order,
    status: "pending",
    createdAt: new Date(),
  };

  const result = await ordersCollection.insertOne(newOrder);

  // 🔥 evento creación
  broadcast({
    type: "ORDER_CREATED",
    orderId: result.insertedId,
    symbol: order.symbol,
  });

  // 👇 simulación ejecución
  setTimeout(async () => {
    await ordersCollection.updateOne(
      { _id: result.insertedId },
      { $set: { status: "filled" } }
    );

    // 🔥 evento ejecución
    broadcast({
      type: "ORDER_FILLED",
      orderId: result.insertedId,
      symbol: order.symbol,
    });
  }, 3000);

  return result.insertedId;
};

export const getOrdersByUser = async (userId: string) => {
  return ordersCollection.find({ userId }).toArray();
};