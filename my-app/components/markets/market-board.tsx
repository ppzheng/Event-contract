"use client";

import { useEffect, useState } from "react";
import { EventList } from "@/components/markets/event-list";
import { tickEvents } from "@/lib/realtime/market-tick";
import { formatCompactUsd } from "@/lib/utils/format";
import type { EventContract } from "@/types/event-contract";

export function MarketBoard({ initialEvents }: { initialEvents: EventContract[] }) {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    let tick = 0;
    const intervalId = window.setInterval(() => {
      tick += 1;
      setEvents((currentEvents) => tickEvents(currentEvents, tick));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const totalVolume = events.reduce((sum, event) => sum + event.volume, 0);
  const totalParticipants = events.reduce(
    (sum, event) => sum + event.participants,
    0,
  );
  const liveMarkets = events.filter((event) => event.status === "TRADING").length;

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            <p className="text-sm font-semibold text-amber-300">
              Mock realtime event contracts
            </p>
          </div>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl">
            Trade YES or NO on event outcomes with fixed-risk pricing.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
            Browse mock markets inspired by Binance Event Contract,
            Hyperliquid, and Polymarket. Prices, countdowns, volume, and
            participants are simulated locally for frontend demo use only.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <SummaryStat label="Active Markets" value={String(liveMarkets)} />
          <SummaryStat label="Mock Volume" value={formatCompactUsd(totalVolume)} />
          <SummaryStat
            label="Participants"
            value={totalParticipants.toLocaleString("en-US")}
          />
          <SummaryStat label="Realtime" value="Local" />
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-3 border-b border-zinc-800 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Markets
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">
            Event Contracts
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Crypto", "Macro", "Sports", "Politics"].map((filter) => (
            <span
              className="rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300"
              key={filter}
            >
              {filter}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-5">
        <EventList events={events} />
      </div>
    </>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-black/40 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-2 truncate text-2xl font-semibold text-zinc-50">
        {value}
      </p>
    </div>
  );
}
