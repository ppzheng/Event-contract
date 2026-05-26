import Link from "next/link";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  formatCompactUsd,
  formatPrice,
  formatProbability,
  formatUsd,
} from "@/lib/utils/format";
import type { EventContract } from "@/types/event-contract";

export function EventCard({ event }: { event: EventContract }) {
  const isPositive = event.priceChange24h >= 0;
  const yesProbability = Math.round(event.yesPrice * 100);
  const noProbability = Math.round(event.noPrice * 100);

  return (
    <Link
      className="group block rounded-lg border border-zinc-800 bg-zinc-950/90 p-4 shadow-[0_16px_50px_rgba(0,0,0,0.28)] outline-none transition duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900/90 focus-visible:border-amber-400"
      href={`/events/${event.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-bold text-black">
              {event.category}
            </span>
            <span className="rounded border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300">
              {event.symbol}
            </span>
            <StatusBadge status={event.status} />
          </div>
          <h2 className="mt-4 text-lg font-semibold leading-6 text-zinc-50">
            {event.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {event.strikeLine}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500">Countdown</p>
          <p className="mt-1 whitespace-nowrap text-sm font-semibold text-amber-300">
            {event.countdown}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-md border border-zinc-800 bg-black/30 p-3">
          <p className="text-xs text-zinc-500">Live Reference</p>
          <p className="mt-1 text-lg font-semibold text-zinc-50">
            {event.symbol.includes("USDT")
              ? formatPrice(event.currentPrice)
              : event.currentPrice.toFixed(2)}
          </p>
          <p
            className={`mt-1 text-xs font-medium ${
              isPositive ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {isPositive ? "+" : ""}
            {event.priceChange24h.toFixed(2)}%
          </p>
        </div>
        <div className="rounded-md border border-zinc-800 bg-black/30 p-3">
          <p className="text-xs text-zinc-500">Participants</p>
          <p className="mt-1 text-lg font-semibold text-zinc-50">
            {event.participants.toLocaleString("en-US")}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Mock traders</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-emerald-300">
            YES {formatProbability(yesProbability)}
          </span>
          <span className="font-semibold text-rose-300">
            NO {formatProbability(noProbability)}
          </span>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="bg-emerald-400"
            style={{ width: `${yesProbability}%` }}
          />
          <div className="flex-1 bg-rose-400" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-800 pt-4 text-sm">
        <div>
          <p className="text-xs text-zinc-500">YES price</p>
          <p className="mt-1 font-semibold text-zinc-100">
            {formatUsd(event.yesPrice, 2)} USDT
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">NO price</p>
          <p className="mt-1 font-semibold text-zinc-100">
            {formatUsd(event.noPrice, 2)} USDT
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Volume</p>
          <p className="mt-1 font-semibold text-zinc-100">
            {formatCompactUsd(event.volume)} USDT
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Market State</p>
          <p className="mt-1 font-semibold text-zinc-100">
            {event.status === "TRADING" ? "Live" : event.status}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm transition duration-200 group-hover:border-amber-400/50">
        <span className="text-zinc-400">Open contract</span>
        <span className="font-semibold text-amber-300">View market</span>
      </div>
    </Link>
  );
}
