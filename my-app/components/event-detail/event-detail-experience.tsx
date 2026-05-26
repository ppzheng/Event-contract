"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EventHeader } from "@/components/event-detail/event-header";
import { EventRules } from "@/components/event-detail/event-rules";
import { MockChart } from "@/components/event-detail/mock-chart";
import { ProbabilityPanel } from "@/components/event-detail/probability-panel";
import { RecentTrades } from "@/components/event-detail/recent-trades";
import { MobileTradeBar } from "@/components/order/mobile-trade-bar";
import { OrderPanel } from "@/components/order/order-panel";
import { PositionsPreview } from "@/components/positions/positions-preview";
import { SettlementResultPanel } from "@/components/settlement/settlement-result-panel";
import {
  createMockPosition,
  settlePositions,
  updatePositionStatuses,
} from "@/lib/calculations/order";
import { createMockTrade, tickEvent } from "@/lib/realtime/market-tick";
import type { ContractSide, EventContract } from "@/types/event-contract";
import type { MockPosition } from "@/types/position";
import type { RecentTrade } from "@/types/trade";

export function EventDetailExperience({
  initialEvent,
  initialTrades,
}: {
  initialEvent: EventContract;
  initialTrades: RecentTrade[];
}) {
  const [event, setEvent] = useState(initialEvent);
  const [lastPositionId, setLastPositionId] = useState<string>();
  const [positions, setPositions] = useState<MockPosition[]>([]);
  const [recentTrades, setRecentTrades] = useState(initialTrades);
  const [selectedSide, setSelectedSide] = useState<ContractSide>("YES");
  const settlingTicksRef = useRef(0);

  useEffect(() => {
    let tick = 0;
    const intervalId = window.setInterval(() => {
      tick += 1;
      setEvent((currentEvent) => {
        const nextEvent = tickEvent(currentEvent, tick);

        const shouldSettle =
          nextEvent.status === "SETTLING" && settlingTicksRef.current >= 2;
        const displayEvent = shouldSettle
          ? {
              ...nextEvent,
              countdown: "Settled",
              status: "SETTLED" as const,
            }
          : nextEvent;

        if (nextEvent.status === "SETTLING") {
          settlingTicksRef.current += 1;
        }

        if (tick % 5 === 0 && nextEvent.status === "TRADING") {
          setRecentTrades((currentTrades) => [
            createMockTrade(nextEvent, tick),
            ...currentTrades.filter(
              (trade, index, trades) =>
                trades.findIndex((candidate) => candidate.id === trade.id) ===
                index,
            ),
          ].slice(0, 5));
        }

        setPositions((currentPositions) =>
          shouldSettle
            ? settlePositions(displayEvent, currentPositions)
            : updatePositionStatuses(displayEvent, currentPositions),
        );

        return displayEvent;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  function handleConfirmOrder(side: ContractSide, amount: number) {
    const position = createMockPosition(event, side, amount);

    setLastPositionId(position.id);
    setPositions((currentPositions) => [
      position,
      ...currentPositions,
    ]);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#18181b_0,#050505_38%,#000_100%)] pb-24 text-zinc-100 md:pb-0">
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Link
            className="text-sm font-medium text-amber-300 hover:text-amber-200"
            href="/"
          >
            Back to markets
          </Link>
          <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            <span>Local mock realtime. No real API, wallet, orderbook, or funds.</span>
          </div>
        </div>

        <EventHeader event={event} />

        <div className="mt-4">
          <SettlementResultPanel event={event} />
        </div>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px_360px]">
          <div className="space-y-4">
            <MockChart
              entryPrice={
                positions.find((position) => position.id === lastPositionId)
                  ?.entryPrice
              }
              event={event}
            />
            <EventRules event={event} />
          </div>

          <div className="space-y-4">
            <ProbabilityPanel event={event} />
            <RecentTrades trades={recentTrades} />
          </div>

          <OrderPanel
            event={event}
            lastPosition={positions.find(
              (position) => position.id === lastPositionId,
            )}
            onConfirm={handleConfirmOrder}
            onSideChange={setSelectedSide}
            selectedSide={selectedSide}
          />
        </section>

        <div className="mt-4">
          <PositionsPreview
            latestPositionId={lastPositionId}
            positions={positions}
          />
        </div>
      </div>
      <MobileTradeBar event={event} onSelectSide={setSelectedSide} />
    </main>
  );
}
