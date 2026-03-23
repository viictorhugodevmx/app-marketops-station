import { Request, Response } from "express";
import { getMarketData } from "./market.service";

export const getMarket = (_req: Request, res: Response) => {
  const data = getMarketData();
  res.json(data);
};