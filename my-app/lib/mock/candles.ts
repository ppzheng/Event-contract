import type { CandlestickData, HistogramData, Time } from "lightweight-charts";
import type { EventContract } from "@/types/event-contract";

export type MockCandleBundle = {
  candles: CandlestickData<Time>[];
  volumes: HistogramData<Time>[];
};

export function createMockCandleBundle(event: EventContract): MockCandleBundle {
  const baseTime = Math.floor(Date.now() / 1000) - 60 * 79;
  let previousClose = event.currentPrice * 0.995;

  const candles = Array.from({ length: 80 }, (_, index) => {
    const wave = Math.sin(index / 5) * getScale(event.currentPrice);
    const drift = (index - 40) * getScale(event.currentPrice) * 0.08;
    const close = Math.max(previousClose + wave * 0.14 + drift * 0.02, 0.01);
    const open = previousClose;
    const high = Math.max(open, close) + getScale(event.currentPrice) * (0.8 + (index % 3) * 0.2);
    const low = Math.max(
      Math.min(open, close) - getScale(event.currentPrice) * (0.7 + (index % 4) * 0.16),
      0.01,
    );

    previousClose = close;

    const time = (baseTime + index * 60) as Time;

    return {
      close: round(close),
      high: round(high),
      low: round(low),
      open: round(open),
      time,
    };
  });

  const volumes = candles.map((candle, index) => ({
    color: candle.close >= candle.open ? "rgba(52, 211, 153, 0.32)" : "rgba(251, 113, 133, 0.32)",
    time: candle.time,
    value: 120 + (index % 9) * 18 + Math.abs(candle.close - candle.open) * 2,
  }));

  return { candles, volumes };
}

export function updateCandleBundle(
  candles: CandlestickData<Time>[],
  volumes: HistogramData<Time>[],
  price: number,
  shouldCreateCandle: boolean,
) {
  const nextCandles = [...candles];
  const nextVolumes = [...volumes];
  const latest = nextCandles[nextCandles.length - 1];

  if (!latest) {
    return { candles: nextCandles, volumes: nextVolumes };
  }

  if (shouldCreateCandle) {
    const nextTime = ((latest.time as number) + 60) as Time;
    const nextCandle = {
      close: price,
      high: Math.max(latest.close, price),
      low: Math.min(latest.close, price),
      open: latest.close,
      time: nextTime,
    };

    nextCandles.push(nextCandle);
    nextVolumes.push({
      color: nextCandle.close >= nextCandle.open ? "rgba(52, 211, 153, 0.32)" : "rgba(251, 113, 133, 0.32)",
      time: nextTime,
      value: 180,
    });

    return {
      candles: nextCandles.slice(-90),
      volumes: nextVolumes.slice(-90),
    };
  }

  nextCandles[nextCandles.length - 1] = {
    ...latest,
    close: price,
    high: Math.max(latest.high, price),
    low: Math.min(latest.low, price),
  };

  const latestVolume = nextVolumes[nextVolumes.length - 1];

  if (latestVolume) {
    nextVolumes[nextVolumes.length - 1] = {
      ...latestVolume,
      color: price >= latest.open ? "rgba(52, 211, 153, 0.32)" : "rgba(251, 113, 133, 0.32)",
      value: latestVolume.value + 24,
    };
  }

  return { candles: nextCandles, volumes: nextVolumes };
}

function getScale(price: number) {
  if (price > 10000) {
    return 35;
  }

  if (price > 1000) {
    return 3.5;
  }

  if (price > 100) {
    return 0.22;
  }

  return 0.08;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
