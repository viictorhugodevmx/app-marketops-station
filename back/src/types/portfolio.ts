export interface Position {
  symbol: string;
  quantity: number;
}

export interface Portfolio {
  userId: string;
  balance: number;
  positions: Position[];
}