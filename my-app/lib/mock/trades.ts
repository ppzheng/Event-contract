import type { RecentTrade } from "@/types/trade";

const tradeTimes = ["00:44:18", "00:44:05", "00:43:51", "00:43:37", "00:43:11"];

export function getRecentTrades(eventId: string): RecentTrade[] {
  return tradeTimes.map((timestamp, index) => {
    const side = index % 2 === 0 ? "YES" : "NO";

    return {
      id: `${eventId}-trade-${index + 1}`,
      eventId,
      side,
      amount: [120, 48, 260, 75, 34][index],
      price: side === "YES" ? [0.58, 0.56, 0.59, 0.57, 0.6][index] : [0.42, 0.44, 0.41, 0.43, 0.4][index],
      timestamp,
    };
  });
}
