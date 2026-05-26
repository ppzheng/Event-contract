import { formatUsd } from "@/lib/utils/format";
import type { AnyPositionStatus, MockPosition } from "@/types/position";

const statusStyles: Record<AnyPositionStatus, string> = {
  LOSING: "text-rose-300",
  LOST: "text-rose-300",
  NEUTRAL: "text-zinc-300",
  OPEN: "text-zinc-300",
  REFUNDED: "text-amber-300",
  WINNING: "text-emerald-300",
  WON: "text-emerald-300",
};

export function PositionsPreview({
  latestPositionId,
  positions,
}: {
  latestPositionId?: string;
  positions: MockPosition[];
}) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-50">Event Positions</p>
        <span className="text-xs text-zinc-500">Local mock only</span>
      </div>
      <div className="mt-4 overflow-hidden rounded-md border border-zinc-800">
        <div className="hidden grid-cols-8 gap-4 bg-black/40 px-4 py-3 text-xs text-zinc-500 md:grid">
          <span>Event</span>
          <span>Side</span>
          <span>Amount</span>
          <span>Entry</span>
          <span>Payout</span>
          <span>PnL</span>
          <span>Status</span>
          <span className="text-right">Opened</span>
        </div>

        {positions.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-zinc-500">
            No mock positions yet. Confirm a YES or NO preview order to create
            a local demo position.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {positions.map((position) => (
              <div
                className={`grid gap-3 px-4 py-4 text-sm md:grid-cols-8 md:gap-4 ${
                  position.id === latestPositionId
                    ? "bg-amber-300/10 ring-1 ring-inset ring-amber-300/30"
                    : ""
                }`}
                key={position.id}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-zinc-100">
                    {position.eventTitle}
                  </span>
                  {position.id === latestPositionId ? (
                    <span className="mt-1 block text-xs text-amber-300">
                      Latest mock position
                    </span>
                  ) : null}
                </span>
                <span>
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      position.side === "YES"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-rose-400/10 text-rose-300"
                    }`}
                  >
                    {position.side}
                  </span>
                </span>
                <span className="text-zinc-300">
                  {formatUsd(position.amount, 2)} USDT
                </span>
                <span className="text-zinc-300">
                  {formatUsd(position.entryPrice, 2)}
                </span>
                <span className="text-zinc-300">
                  {formatUsd(position.finalPayout ?? position.potentialPayout, 2)} USDT
                </span>
                <span className={getPnlClass(position.pnl)}>
                  {typeof position.pnl === "number"
                    ? `${position.pnl >= 0 ? "+" : ""}${formatUsd(position.pnl, 2)} USDT`
                    : "--"}
                </span>
                <span className={`font-semibold ${statusStyles[position.status]}`}>
                  {position.status}
                </span>
                <span className="text-left text-zinc-500 md:text-right">
                  {position.settledAt ?? position.openedAt}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function getPnlClass(pnl?: number) {
  if (typeof pnl !== "number") {
    return "text-zinc-500";
  }

  if (pnl > 0) {
    return "text-emerald-300";
  }

  if (pnl < 0) {
    return "text-rose-300";
  }

  return "text-amber-300";
}
