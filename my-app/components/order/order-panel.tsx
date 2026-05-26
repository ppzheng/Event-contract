"use client";

import { useMemo, useState } from "react";
import { calculateOrderPreview } from "@/lib/calculations/order";
import { formatUsd } from "@/lib/utils/format";
import type { ContractSide, EventContract } from "@/types/event-contract";
import type { MockPosition } from "@/types/position";

export function OrderPanel({
  event,
  lastPosition,
  onConfirm,
  onSideChange,
  selectedSide,
}: {
  event: EventContract;
  lastPosition?: MockPosition;
  onConfirm: (side: ContractSide, amount: number) => void;
  onSideChange: (side: ContractSide) => void;
  selectedSide: ContractSide;
}) {
  const [amount, setAmount] = useState(10);
  const isTradable = event.status === "TRADING";
  const safeAmount = Number.isFinite(amount) ? Math.max(amount, 0) : 0;
  const preview = useMemo(
    () => calculateOrderPreview(event, selectedSide, safeAmount || 1),
    [event, safeAmount, selectedSide],
  );
  const canConfirm = isTradable && safeAmount > 0;

  return (
    <aside
      className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 lg:sticky lg:top-24"
      id="order-panel"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-50">Fixed-Risk Order</p>
        <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
          Mock
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <SideButton
          active={selectedSide === "YES"}
          label="Buy YES"
          onClick={() => onSideChange("YES")}
          price={event.yesPrice}
          tone="yes"
        />
        <SideButton
          active={selectedSide === "NO"}
          label="Buy NO"
          onClick={() => onSideChange("NO")}
          price={event.noPrice}
          tone="no"
        />
      </div>

      <div className="mt-5">
        <label className="text-xs text-zinc-500" htmlFor="amount-preview">
          Amount
        </label>
        <div className="mt-2 flex h-12 items-center justify-between rounded-md border border-zinc-800 bg-black/40 px-3 focus-within:border-amber-300/60">
          <input
            className="w-full bg-transparent text-lg font-semibold text-zinc-100 outline-none"
            id="amount-preview"
            inputMode="decimal"
            min={0}
            onChange={(event) => setAmount(Number(event.target.value))}
            type="number"
            value={amount}
          />
          <span className="text-sm text-zinc-500">USDT</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[5, 10, 25, 50].map((quickAmount) => (
            <button
              className={`rounded border px-2 py-2 text-xs font-medium ${
                amount === quickAmount
                  ? "border-amber-300 bg-amber-300 text-black"
                  : "border-zinc-800 bg-black/30 text-zinc-300 hover:border-zinc-600"
              }`}
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              type="button"
            >
              {quickAmount}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3 rounded-md border border-zinc-800 bg-black/30 p-4 text-sm">
        <PreviewRow label="Entry Price" value={`${formatUsd(preview.entryPrice, 2)} USDT`} />
        <PreviewRow label="You Pay" value={`${formatUsd(safeAmount, 2)} USDT`} />
        <PreviewRow label="Max Loss" value={`${formatUsd(preview.maxLoss, 2)} USDT`} />
        <PreviewRow label="Potential Payout" value={`${formatUsd(preview.potentialPayout, 2)} USDT`} />
        <PreviewRow label="Net Profit If Correct" value={`+${formatUsd(preview.netProfit, 2)} USDT`} positive />
      </div>

      <button
        className={`mt-5 h-12 w-full rounded-md text-sm font-semibold ${
          canConfirm
            ? "bg-amber-300 text-black hover:bg-amber-200"
            : "bg-zinc-800 text-zinc-500"
        }`}
        disabled={!canConfirm}
        onClick={() => onConfirm(selectedSide, safeAmount)}
        type="button"
      >
        {isTradable ? `Confirm ${selectedSide} Mock Order` : "Market Not Tradable"}
      </button>

      {lastPosition ? (
        <div className="mt-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-emerald-200">
              Mock order created
            </p>
            <span className="text-xs font-medium text-emerald-300">
              {lastPosition.side}
            </span>
          </div>
          <div className="mt-3 space-y-2 text-xs text-emerald-50/85">
            <div className="flex justify-between">
              <span>Amount</span>
              <span>{formatUsd(lastPosition.amount, 2)} USDT</span>
            </div>
            <div className="flex justify-between">
              <span>Entry</span>
              <span>{formatUsd(lastPosition.entryPrice, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Potential payout</span>
              <span>{formatUsd(lastPosition.potentialPayout, 2)} USDT</span>
            </div>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-5 text-zinc-500">
        Mock order only. This creates a local demo position and does not debit a
        wallet, call an API, match orders, or move real funds.
      </p>
    </aside>
  );
}

function SideButton({
  active,
  label,
  onClick,
  price,
  tone,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  price: number;
  tone: "yes" | "no";
}) {
  const activeStyles =
    tone === "yes"
      ? "border-emerald-400/50 bg-emerald-400/15"
      : "border-rose-400/50 bg-rose-400/15";
  const inactiveStyles = "border-zinc-800 bg-black/30 hover:border-zinc-600";
  const textStyles = tone === "yes" ? "text-emerald-300" : "text-rose-300";

  return (
    <button
      className={`rounded-md border px-3 py-3 text-left ${
        active ? activeStyles : inactiveStyles
      }`}
      onClick={onClick}
      type="button"
    >
      <span className={`block text-xs ${textStyles}`}>{label}</span>
      <span className={`mt-1 block text-lg font-semibold ${textStyles}`}>
        {formatUsd(price, 2)}
      </span>
    </button>
  );
}

function PreviewRow({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-zinc-500">{label}</span>
      <span
        className={`text-right font-medium ${
          positive ? "text-emerald-300" : "text-zinc-100"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
