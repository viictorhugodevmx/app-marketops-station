type MarketItem = {
  symbol: string;
  price: number;
};

let marketData: MarketItem[] = [
  { symbol: "BTC", price: 50000 },
  { symbol: "ETH", price: 3000 },
  { symbol: "AAPL", price: 180 },
];

// 👇 simulación de cambio de precios
setInterval(() => {
  marketData = marketData.map((item) => ({
    ...item,
    price: Number((item.price + (Math.random() - 0.5) * 50).toFixed(2)),
  }));
}, 3000);

export const getMarketData = () => {
  return marketData;
};