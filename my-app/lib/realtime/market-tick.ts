import type { EventContract, EventStatus } from "@/types/event-contract";
import type { RecentTrade } from "@/types/trade";

export function tickEvents(events: EventContract[], tick: number) {
  return events.map((event, index) => tickEvent(event, tick + index));
}

export function tickEvent(event: EventContract, tick: number): EventContract {
  if (event.status === "SETTLED" || event.status === "PAUSED") {
    return event;
  }

  if (event.status === "SETTLING") {
    return {
      ...event,
      countdown: "Settling",
    };
  }

  const nextSeconds =
    event.status === "TRADING" || event.status === "LOCKED"
      ? Math.max(event.timeRemainingSeconds - 1, 0)
      : event.timeRemainingSeconds;
  const nextStatus = getNextStatus(event.status, nextSeconds);
  const nextPrice = getNextPrice(event, tick);
  const nextYesPrice = getNextYesPrice(event, nextPrice, tick, nextSeconds);

  return {
    ...event,
    countdown: formatCountdown(nextSeconds, nextStatus),
    currentPrice: nextPrice,
    noPrice: roundQuote(1 - nextYesPrice),
    priceChange24h: round(event.priceChange24h + Math.sin(tick / 8) * 0.01, 2),
    status: nextStatus,
    timeRemainingSeconds: nextSeconds,
    volume: event.status === "TRADING" ? event.volume + 120 + (tick % 7) * 8 : event.volume,
    yesPrice: nextYesPrice,
  };
}

export function createMockTrade(event: EventContract, tick: number): RecentTrade {
  const side = event.yesPrice >= event.noPrice ? "YES" : "NO";
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return {
    id: `${event.id}-live-${tick}-${Date.now()}`,
    amount: 20 + (tick % 9) * 15,
    eventId: event.id,
    price: side === "YES" ? event.yesPrice : event.noPrice,
    side,
    timestamp,
  };
}

function getNextStatus(status: EventStatus, seconds: number): EventStatus {
  if (status === "PAUSED" || status === "SETTLED") {
    return status;
  }

  if (seconds <= 0) {
    return "SETTLING";
  }

  if (seconds <= 45) {
    return "LOCKED";
  }

  return "TRADING";
}

function getNextPrice(event: EventContract, tick: number) {
  if (!event.symbol.includes("USDT")) {
    return round(event.currentPrice + Math.sin(tick / 5) * 0.04, 2);
  }

  const scale = event.currentPrice > 10000 ? 22 : event.currentPrice > 1000 ? 2.4 : 0.18;
  const drift = Math.sin(tick / 4) * scale + Math.cos(tick / 7) * scale * 0.35;

  return round(Math.max(event.currentPrice + drift, 0.01), event.currentPrice > 1000 ? 2 : 3);
}

function getNextYesPrice(
  event: EventContract,
  nextPrice: number,
  tick: number,
  seconds: number,
) {
  const directionBias = nextPrice >= event.currentPrice ? 0.01 : -0.01;
  const timePressure = seconds > 0 && seconds < 60 ? 0.015 : 0;
  const wave = Math.sin(tick / 6) * 0.006;
  const leaderBias = event.yesPrice >= event.noPrice ? timePressure : -timePressure;

  return roundQuote(event.yesPrice + directionBias + wave + leaderBias);
}

function formatCountdown(seconds: number, status: EventStatus) {
  if (status === "PAUSED") {
    return "Paused";
  }

  if (status === "SETTLING") {
    return "Settling";
  }

  if (seconds >= 86400) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);

    return `${days}D ${String(hours).padStart(2, "0")}H`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function roundQuote(value: number) {
  return round(Math.min(Math.max(value, 0.05), 0.95), 2);
}

function round(value: number, decimals: number) {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
}
