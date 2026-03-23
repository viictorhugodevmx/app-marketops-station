import { Request, Response } from "express";
import { calculatePortfolio } from "./portfolio.service";

export const getMyPortfolio = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const portfolio = await calculatePortfolio(userId);

    res.json(portfolio);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};