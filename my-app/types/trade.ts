import type { ContractSide } from "@/types/event-contract";

export type RecentTrade = {
  id: string;
  eventId: string;
  side: ContractSide;
  amount: number;
  price: number;
  timestamp: string;
};
