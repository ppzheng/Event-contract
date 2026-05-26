import { AppHeader } from "@/components/layout/app-header";
import { MarketBoard } from "@/components/markets/market-board";
import { mockEvents } from "@/lib/mock/events";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#18181b_0,#050505_38%,#000_100%)] text-zinc-100">
      <AppHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <MarketBoard initialEvents={mockEvents} />
      </div>
    </main>
  );
}
