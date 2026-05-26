"use client";

import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  HistogramSeries,
  type IChartApi,
  type IPriceLine,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import {
  createMockCandleBundle,
  updateCandleBundle,
} from "@/lib/mock/candles";
import { formatPrice } from "@/lib/utils/format";
import type { EventContract } from "@/types/event-contract";

export function MockChart({
  entryPrice,
  event,
}: {
  entryPrice?: number;
  event: EventContract;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick", Time> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram", Time> | null>(null);
  const entryLineRef = useRef<IPriceLine | null>(null);
  const initialPriceRef = useRef(event.currentPrice);
  const tickRef = useRef(0);
  const dataRef = useRef(createMockCandleBundle(event));
  const currentResult = event.yesPrice >= event.noPrice ? "YES leading" : "NO leading";
  const currentResultTone =
    event.yesPrice >= event.noPrice ? "text-emerald-300" : "text-rose-300";
  const referencePrice = event.symbol.includes("USDT")
    ? formatPrice(event.currentPrice)
    : event.currentPrice.toFixed(2);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const chart = createChart(containerRef.current, {
      autoSize: true,
      crosshair: {
        horzLine: {
          color: "rgba(161, 161, 170, 0.35)",
          labelBackgroundColor: "#18181b",
        },
        mode: 1,
        vertLine: {
          color: "rgba(161, 161, 170, 0.35)",
          labelBackgroundColor: "#18181b",
        },
      },
      grid: {
        horzLines: { color: "rgba(63, 63, 70, 0.32)" },
        vertLines: { color: "rgba(63, 63, 70, 0.18)" },
      },
      layout: {
        background: { color: "#050505", type: ColorType.Solid },
        textColor: "#a1a1aa",
      },
      localization: {
        priceFormatter: (price: number) =>
          event.symbol.includes("USDT")
            ? price.toLocaleString("en-US", {
                maximumFractionDigits: initialPriceRef.current > 1000 ? 1 : 2,
                minimumFractionDigits: initialPriceRef.current > 1000 ? 1 : 2,
              })
            : price.toFixed(2),
      },
      rightPriceScale: {
        borderColor: "rgba(63, 63, 70, 0.65)",
        scaleMargins: {
          bottom: 0.24,
          top: 0.12,
        },
      },
      timeScale: {
        borderColor: "rgba(63, 63, 70, 0.65)",
        rightOffset: 8,
        timeVisible: true,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      borderDownColor: "#fb7185",
      borderUpColor: "#34d399",
      downColor: "#fb7185",
      priceFormat: {
        minMove: initialPriceRef.current > 1000 ? 0.1 : 0.01,
        precision: initialPriceRef.current > 1000 ? 1 : 2,
        type: "price",
      },
      upColor: "#34d399",
      wickDownColor: "#fb7185",
      wickUpColor: "#34d399",
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      lastValueVisible: false,
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        bottom: 0,
        top: 0.82,
      },
    });

    candleSeries.setData(dataRef.current.candles);
    volumeSeries.setData(dataRef.current.volumes);

    if (event.strikePrice) {
      candleSeries.createPriceLine({
        axisLabelVisible: true,
        color: "#fbbf24",
        lineStyle: 2,
        lineWidth: 2,
        price: event.strikePrice,
        title: "Strike",
      });
    }

    chart.timeScale().fitContent();
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
      entryLineRef.current = null;
    };
  }, [event.strikePrice, event.symbol]);

  useEffect(() => {
    tickRef.current += 1;
    const nextData = updateCandleBundle(
      dataRef.current.candles,
      dataRef.current.volumes,
      event.currentPrice,
      tickRef.current % 10 === 0,
    );

    dataRef.current = nextData;
    candleSeriesRef.current?.setData(nextData.candles);
    volumeSeriesRef.current?.setData(nextData.volumes);
  }, [event.currentPrice]);

  useEffect(() => {
    const candleSeries = candleSeriesRef.current;

    if (!candleSeries || !entryPrice) {
      return;
    }

    if (entryLineRef.current) {
      candleSeries.removePriceLine(entryLineRef.current);
    }

    entryLineRef.current = candleSeries.createPriceLine({
      axisLabelVisible: true,
      color: "#60a5fa",
      lineStyle: 1,
      lineWidth: 2,
      price: entryPrice,
      title: "Entry",
    });
  }, [entryPrice]);

  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <p className="text-sm font-semibold text-zinc-50">Event Chart</p>
          <p className="mt-1 text-xs text-zinc-500">
            TradingView Lightweight Charts with local mock candles
          </p>
        </div>
        <div className="rounded border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-right">
          <p className="text-xs text-amber-200">Current Result</p>
          <p className={`text-sm font-semibold ${currentResultTone}`}>
            {currentResult}
          </p>
        </div>
      </div>

      <div className="relative mt-5 h-[360px] overflow-hidden rounded-md border border-zinc-800 bg-black">
        <div className="h-full w-full" ref={containerRef} />
        <div className="pointer-events-none absolute left-3 top-3 rounded border border-zinc-700 bg-black/65 px-3 py-2">
          <p className="text-xs text-zinc-500">Reference</p>
          <p className="text-sm font-semibold text-zinc-100">{referencePrice}</p>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded border border-zinc-700 bg-black/65 px-3 py-2 text-right">
          <p className="text-xs text-zinc-500">YES / NO</p>
          <p className="text-sm font-semibold text-zinc-100">
            {Math.round(event.yesPrice * 100)} / {Math.round(event.noPrice * 100)}
          </p>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-[11px] text-zinc-500">
          TradingView Lightweight Charts
        </div>
      </div>
    </section>
  );
}
