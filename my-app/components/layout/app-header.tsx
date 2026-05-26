export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Event Contract Demo
          </p>
          <h1 className="mt-1 text-xl font-semibold text-zinc-50">
            Event Contract Markets
          </h1>
        </div>
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-400 lg:flex">
          <span className="text-amber-300">Markets</span>
          <span>Positions</span>
          <span>Research</span>
        </nav>
        <div className="hidden rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-right sm:block">
          <p className="text-xs text-zinc-500">Mode</p>
          <p className="text-sm font-semibold text-zinc-100">Mock Only</p>
        </div>
      </div>
    </header>
  );
}
