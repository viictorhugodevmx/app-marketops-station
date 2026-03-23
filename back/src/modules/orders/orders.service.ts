import { db } from "../../config/db";
import { Order } from "../../types/order";

const ordersCollection = db.collection<Order>("orders");

export const createOrder = async (order: Order) => {
  const newOrder: Order = {
    ...order,
    status: "pending",
    createdAt: new Date(),
  };

  const result = await ordersCollection.insertOne(newOrder);

  // 👇 simulación de ejecución (fintech style)
  setTimeout(async () => {
    await ordersCollection.updateOne(
      { _id: result.insertedId },
      { $set: { status: "filled" } }
    );
  }, 3000);

  return result.insertedId;
};

export const getOrdersByUser = async (userId: string) => {
  return ordersCollection.find({ userId }).toArray();
};