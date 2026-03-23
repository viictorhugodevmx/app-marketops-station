import { Request, Response } from "express";
import { createOrder, getOrdersByUser } from "./orders.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { symbol, type, amount } = req.body;

    const userId = (req as any).user.userId;

    const orderId = await createOrder({
      userId,
      symbol,
      type,
      amount,
      status: "pending",
      createdAt: new Date(),
    });

    res.json({ orderId });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const orders = await getOrdersByUser(userId);

    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};