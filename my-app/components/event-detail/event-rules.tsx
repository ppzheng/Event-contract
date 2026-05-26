import type { EventContract } from "@/types/event-contract";

export function EventRules({ event }: { event: EventContract }) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm font-semibold text-zinc-50">Event Rules</p>
      <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
        <p>YES wins if the final reference value satisfies: {event.strikeLine}.</p>
        <p>NO wins if the final reference value does not satisfy the event condition.</p>
        <p>If the final value exactly equals the strike line, the demo treats the result as refunded.</p>
      </div>
      <div className="mt-4 rounded-md border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">
        This is a frontend mock demo. It does not connect to a real wallet, API,
        orderbook, matching engine, or settlement system.
      </div>
    </section>
  );
}
