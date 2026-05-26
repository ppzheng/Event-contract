import { formatUsd } from "@/lib/utils/format";
import type { RecentTrade } from "@/types/trade";

export function RecentTrades({ trades }: { trades: RecentTrade[] }) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-50">Recent Activity</p>
        <span className="text-xs text-zinc-500">Mock feed</span>
      </div>
      <div className="mt-4 space-y-3">
        {trades.map((trade, index) => (
          <div
            className="grid grid-cols-[52px_1fr_56px_64px] items-center gap-3 text-sm"
            key={`${index}-${trade.timestamp}-${trade.side}-${trade.amount}-${trade.price}`}
          >
            <span
              className={`font-semibold ${
                trade.side === "YES" ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {trade.side}
            </span>
            <span className="text-zinc-300">{trade.amount.toLocaleString("en-US")} USDT</span>
            <span className="text-right text-zinc-300">{formatUsd(trade.price, 2)}</span>
            <span className="text-right text-xs text-zinc-500">{trade.timestamp}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
