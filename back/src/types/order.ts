export interface Order {
  _id?: string;
  userId: string;
  symbol: string;
  type: "buy" | "sell";
  amount: number;
  status: "pending" | "filled";
  createdAt: Date;
}