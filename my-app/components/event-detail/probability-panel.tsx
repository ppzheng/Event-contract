import { formatCompactUsd, formatUsd } from "@/lib/utils/format";
import type { EventContract } from "@/types/event-contract";

export function ProbabilityPanel({ event }: { event: EventContract }) {
  const yesProbability = Math.round(event.yesPrice * 100);
  const noProbability = Math.round(event.noPrice * 100);
  const leadingSide = event.yesPrice >= event.noPrice ? "YES" : "NO";

  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-50">Market Signal</p>
        <span className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
          {leadingSide} leading
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <OutcomeQuote label="YES" price={event.yesPrice} probability={yesProbability} tone="yes" />
        <OutcomeQuote label="NO" price={event.noPrice} probability={noProbability} tone="no" />
      </div>

      <div className="mt-5">
        <div className="flex h-2 overflow-hidden rounded-full bg-zinc-800">
          <div className="bg-emerald-400" style={{ width: `${yesProbability}%` }} />
          <div className="flex-1 bg-rose-400" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          <span>YES {yesProbability}%</span>
          <span>NO {noProbability}%</span>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-zinc-800 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Volume</span>
          <span className="font-medium text-zinc-100">{formatCompactUsd(event.volume)} USDT</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Participants</span>
          <span className="font-medium text-zinc-100">{event.participants.toLocaleString("en-US")}</span>
        </div>
      </div>
    </section>
  );
}

function OutcomeQuote({
  label,
  price,
  probability,
  tone,
}: {
  label: "YES" | "NO";
  price: number;
  probability: number;
  tone: "yes" | "no";
}) {
  const styles =
    tone === "yes"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : "border-rose-400/20 bg-rose-400/10 text-rose-300";

  return (
    <div className={`rounded-md border p-4 ${styles}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-xs">{probability}%</p>
      </div>
      <p className="mt-2 text-2xl font-semibold">{formatUsd(price, 2)}</p>
      <p className="mt-1 text-xs opacity-75">USDT entry price</p>
    </div>
  );
}
