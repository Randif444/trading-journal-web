// src/types/index.ts

export interface Trade {
  id: string;
  date: string;
  pair: string;
  type: "BUY" | "SELL";
  entryPrice: number;
  exitPrice: number;
  lotSize: number;
  pnl: number;

  // Update Status Type: Tambahkan 'SL+'
  status: "WIN" | "LOSS" | "BE" | "SL+";

  screenshotBefore?: string;
  screenshotAfter?: string;
  note?: string;
}

export interface DashboardStats {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  totalPnl: number;
  balance: number;
}

export interface TradeStats {
  balance: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  totalPnl: number;
}
