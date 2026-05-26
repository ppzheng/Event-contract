"use client";

import { formatUsd } from "@/lib/utils/format";
import type { ContractSide, EventContract } from "@/types/event-contract";

export function MobileTradeBar({
  event,
  onSelectSide,
}: {
  event: EventContract;
  onSelectSide: (side: ContractSide) => void;
}) {
  function handleSelect(side: ContractSide) {
    onSelectSide(side);
    document
      .getElementById("order-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-black/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <button
          className="rounded-md border border-emerald-400/40 bg-emerald-400/15 px-4 py-3 text-left"
          onClick={() => handleSelect("YES")}
          type="button"
        >
          <span className="block text-xs font-medium text-emerald-100">
            Buy YES
          </span>
          <span className="mt-1 block text-lg font-semibold text-emerald-300">
            {formatUsd(event.yesPrice, 2)}
          </span>
        </button>
        <button
          className="rounded-md border border-rose-400/40 bg-rose-400/15 px-4 py-3 text-left"
          onClick={() => handleSelect("NO")}
          type="button"
        >
          <span className="block text-xs font-medium text-rose-100">
            Buy NO
          </span>
          <span className="mt-1 block text-lg font-semibold text-rose-300">
            {formatUsd(event.noPrice, 2)}
          </span>
        </button>
      </div>
    </div>
  );
}
