import type { ContractSide, EventContract } from "@/types/event-contract";
import type {
  MockPosition,
  PositionStatus,
  SettledPositionStatus,
} from "@/types/position";

export function getEntryPrice(event: EventContract, side: ContractSide) {
  return side === "YES" ? event.yesPrice : event.noPrice;
}

export function calculateOrderPreview(
  event: EventContract,
  side: ContractSide,
  amount: number,
) {
  const entryPrice = getEntryPrice(event, side);
  const shares = amount / entryPrice;
  const potentialPayout = shares;
  const netProfit = potentialPayout - amount;

  return {
    entryPrice,
    maxLoss: amount,
    netProfit,
    potentialPayout,
    shares,
  };
}

export function createMockPosition(
  event: EventContract,
  side: ContractSide,
  amount: number,
): MockPosition {
  const preview = calculateOrderPreview(event, side, amount);

  return {
    amount,
    entryPrice: preview.entryPrice,
    eventId: event.id,
    eventTitle: event.title,
    id: `${event.id}-${side}-${Date.now()}`,
    openedAt: new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    potentialPayout: preview.potentialPayout,
    shares: preview.shares,
    side,
    status: getPositionStatus(event, side),
  };
}

export function updatePositionStatuses(
  event: EventContract,
  positions: MockPosition[],
) {
  return positions.map((position) =>
    position.eventId === event.id && isOpenPositionStatus(position.status)
      ? {
          ...position,
          status: getPositionStatus(event, position.side),
        }
      : position,
  );
}

export function getWinningSide(event: EventContract): ContractSide | "REFUNDED" {
  if (!event.strikePrice) {
    return "REFUNDED";
  }

  if (Math.abs(event.currentPrice - event.strikePrice) < 0.01) {
    return "REFUNDED";
  }

  return event.currentPrice > event.strikePrice ? "YES" : "NO";
}

export function settlePositions(
  event: EventContract,
  positions: MockPosition[],
) {
  const winningSide = getWinningSide(event);
  const settledAt = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return positions.map((position) => {
    if (position.eventId !== event.id || !isOpenPositionStatus(position.status)) {
      return position;
    }

    const status = getSettledStatus(position.side, winningSide);
    const finalPayout =
      status === "WON"
        ? position.potentialPayout
        : status === "REFUNDED"
          ? position.amount
          : 0;

    return {
      ...position,
      finalPayout,
      finalPrice: event.currentPrice,
      pnl: finalPayout - position.amount,
      settledAt,
      status,
    };
  });
}

function getSettledStatus(
  side: ContractSide,
  winningSide: ContractSide | "REFUNDED",
): SettledPositionStatus {
  if (winningSide === "REFUNDED") {
    return "REFUNDED";
  }

  return side === winningSide ? "WON" : "LOST";
}

function isOpenPositionStatus(status: MockPosition["status"]) {
  return status === "OPEN" || status === "WINNING" || status === "LOSING" || status === "NEUTRAL";
}

function getPositionStatus(
  event: EventContract,
  side: ContractSide,
): PositionStatus {
  if (event.yesPrice === event.noPrice) {
    return "NEUTRAL";
  }

  const winningSide = event.yesPrice > event.noPrice ? "YES" : "NO";

  return side === winningSide ? "WINNING" : "LOSING";
}
