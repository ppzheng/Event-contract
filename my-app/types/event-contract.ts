export type ContractSide = "YES" | "NO";

export type EventStatus = "TRADING" | "LOCKED" | "SETTLING" | "SETTLED" | "PAUSED";

export type EventCategory = "Crypto" | "Macro" | "Sports" | "Politics";

export type EventContract = {
  id: string;
  title: string;
  category: EventCategory;
  status: EventStatus;
  countdown: string;
  timeRemainingSeconds: number;
  yesPrice: number;
  noPrice: number;
  volume: number;
  participants: number;
  strikePrice?: number;
  strikeLine: string;
  symbol: string;
  currentPrice: number;
  priceChange24h: number;
};
