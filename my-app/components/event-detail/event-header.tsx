import { StatusBadge } from "@/components/shared/status-badge";
import { formatCompactUsd, formatPrice } from "@/lib/utils/format";
import type { EventContract } from "@/types/event-contract";

export function EventHeader({ event }: { event: EventContract }) {
  const liveReference = event.symbol.includes("USDT")
    ? formatPrice(event.currentPrice)
    : event.currentPrice.toFixed(2);
  const isSettling = event.status === "SETTLING";
  const isSettled = event.status === "SETTLED";
  const isUrgent =
    !isSettling &&
    !isSettled &&
    (event.status === "LOCKED" || event.timeRemainingSeconds <= 60);

  return (
    <section
      className={`rounded-lg border bg-zinc-950 p-5 ${
        isUrgent || isSettling || isSettled
          ? "border-amber-400/40 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]"
          : "border-zinc-800"
      }`}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-bold text-black">
              {event.category}
            </span>
            <span className="rounded border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300">
              {event.symbol}
            </span>
            <StatusBadge status={event.status} />
          </div>
          <h1 className="mt-4 max-w-4xl text-2xl font-semibold leading-tight text-zinc-50 sm:text-3xl">
            {event.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            {event.strikeLine}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[560px]">
          <HeaderStat label="Index Price" value={liveReference} live />
          <HeaderStat
            label={isSettling ? "Settlement" : isSettled ? "Result" : "Time Left"}
            value={event.countdown}
            urgent={isUrgent || isSettling || isSettled}
          />
          <HeaderStat label="Volume" value={`${formatCompactUsd(event.volume)} USDT`} />
          <HeaderStat label="Participants" value={event.participants.toLocaleString("en-US")} />
        </div>
      </div>
      {isUrgent || isSettling || isSettled ? (
        <div className="mt-4 rounded-md border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">
          {isSettling
            ? "Mock settlement is in progress. Trading is disabled for this event."
            : isSettled
              ? "Mock settlement is complete. Check the result panel and position PnL below."
              : "Trading locks near expiry. Review risk before placing a mock order."}
        </div>
      ) : null}
    </section>
  );
}

function HeaderStat({
  label,
  live = false,
  urgent = false,
  value,
}: {
  label: string;
  live?: boolean;
  urgent?: boolean;
  value: string;
}) {
  return (
    <div className="rounded-md border border-zinc-800 bg-black/30 p-3">
      <p className="flex items-center gap-2 text-xs text-zinc-500">
        {live ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> : null}
        {label}
      </p>
      <p
        className={`mt-1 truncate text-sm font-semibold ${
          urgent ? "text-amber-300" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
