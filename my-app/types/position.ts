import type { ContractSide } from "@/types/event-contract";

export type PositionStatus = "OPEN" | "WINNING" | "LOSING" | "NEUTRAL";
export type SettledPositionStatus = "WON" | "LOST" | "REFUNDED";
export type AnyPositionStatus = PositionStatus | SettledPositionStatus;

export type MockPosition = {
  id: string;
  eventId: string;
  eventTitle: string;
  side: ContractSide;
  amount: number;
  entryPrice: number;
  shares: number;
  potentialPayout: number;
  openedAt: string;
  finalPayout?: number;
  finalPrice?: number;
  pnl?: number;
  settledAt?: string;
  status: AnyPositionStatus;
};
