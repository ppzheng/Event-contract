import type { EventStatus } from "@/types/event-contract";

const statusStyles: Record<EventStatus, string> = {
  TRADING: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  LOCKED: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  SETTLING: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  SETTLED: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
  PAUSED: "border-violet-400/30 bg-violet-400/10 text-violet-300",
};

export function StatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded border px-2 text-[11px] font-semibold tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
