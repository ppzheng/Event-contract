import { getWinningSide } from "@/lib/calculations/order";
import { formatPrice } from "@/lib/utils/format";
import type { EventContract } from "@/types/event-contract";

export function SettlementResultPanel({ event }: { event: EventContract }) {
  if (event.status !== "SETTLING" && event.status !== "SETTLED") {
    return null;
  }

  const winningSide = getWinningSide(event);
  const finalPrice = event.symbol.includes("USDT")
    ? formatPrice(event.currentPrice)
    : event.currentPrice.toFixed(2);
  const strikePrice = event.strikePrice
    ? event.symbol.includes("USDT")
      ? formatPrice(event.strikePrice)
      : event.strikePrice.toFixed(2)
    : "No numeric strike";

  return (
    <section
      className={`rounded-lg border p-5 ${
        event.status === "SETTLED"
          ? "border-emerald-400/30 bg-emerald-400/10"
          : "border-amber-400/30 bg-amber-400/10"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Settlement
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">
            {event.status === "SETTLED" ? "Event settled" : "Mock settlement running"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
            {winningSide === "REFUNDED"
              ? "This demo event resolves as refunded because no clear numeric winner can be determined."
              : `${winningSide} wins because the final reference price is ${
                  winningSide === "YES" ? "above" : "below"
                } the strike price.`}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 md:min-w-[560px]">
          <SettlementStat label="Status" value={event.status} />
          <SettlementStat label="Winner" value={winningSide} />
          <SettlementStat label="Final" value={finalPrice} />
          <SettlementStat label="Strike" value={strikePrice} />
        </div>
      </div>
    </section>
  );
}

function SettlementStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-700/70 bg-black/30 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-zinc-50">{value}</p>
    </div>
  );
}
