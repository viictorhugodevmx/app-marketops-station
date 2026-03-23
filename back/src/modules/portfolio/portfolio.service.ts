import { db } from "../../config/db";
import { Portfolio } from "../../types/portfolio";
import { Order } from "../../types/order";
import { getMarketData } from "../market/market.service";

const portfolioCollection = db.collection<Portfolio>("portfolios");
const ordersCollection = db.collection<Order>("orders");

// 👇 inicializar portafolio si no existe
const getOrCreatePortfolio = async (userId: string) => {
  const existingPortfolio = await portfolioCollection.findOne({ userId });

  if (existingPortfolio) {
    return existingPortfolio;
  }

  const newPortfolio: Portfolio = {
    userId,
    balance: 10000,
    positions: [],
  };

  await portfolioCollection.insertOne(newPortfolio);

  return newPortfolio;
};

// 👇 recalcular portafolio en base a órdenes
export const calculatePortfolio = async (userId: string) => {
  const orders = await ordersCollection
    .find({ userId, status: "filled" })
    .toArray();

  const portfolio = await getOrCreatePortfolio(userId);

  const positionsMap: Record<string, number> = {};

  orders.forEach((order) => {
    const qty = order.amount / 1000;

    if (!positionsMap[order.symbol]) {
      positionsMap[order.symbol] = 0;
    }

    if (order.type === "buy") {
      positionsMap[order.symbol] += qty;
    } else {
      positionsMap[order.symbol] -= qty;
    }
  });

  const positions = Object.entries(positionsMap).map(
    ([symbol, quantity]) => ({
      symbol,
      quantity: Number(quantity.toFixed(4)),
    })
  );

  const market = getMarketData();

  let totalValue = portfolio.balance;

  positions.forEach((pos) => {
    const marketItem = market.find((m) => m.symbol === pos.symbol);

    if (marketItem) {
      totalValue += pos.quantity * marketItem.price;
    }
  });

  const pnl = totalValue - 10000; // inversión inicial simulada

  const updatedPortfolio = {
    userId: portfolio.userId,
    balance: portfolio.balance,
    positions,
    totalValue: Number(totalValue.toFixed(2)),
    pnl: Number(pnl.toFixed(2)),
  };

  await portfolioCollection.updateOne(
    { userId },
    { $set: updatedPortfolio }
  );

  return updatedPortfolio;
};