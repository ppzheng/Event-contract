# Event Contract Demo

An AI-native frontend prototype for fixed-risk event contract trading.

This demo explores how a Binance Event Contract style product can feel when combined with Polymarket's YES / NO market language and a Hyperliquid-inspired trading surface. It is built for UX validation, trading atmosphere, and interaction quality rather than production trading infrastructure.

> Frontend demo only. No real wallet, no real API, no backend, no matching engine, no real funds.

## Project Overview

Event Contract Demo compresses trading into one clear decision:

```text
Will this market condition be true at expiry?
```

Users can browse mock events, choose YES or NO, enter a fixed amount, preview max loss and potential payout, watch a mock market move in realtime, and see local settlement results.

The core loop:

```text
Event List -> Event Detail -> Buy YES / NO -> Position -> Countdown -> Settlement -> PnL
```

The product goal is to make event contracts understandable without making the interface feel like a generic dashboard. It should feel active, dense, and market-native while remaining easier to understand than a professional futures screen.

## Inspiration

The prototype blends three product references:

- **Binance Event Contract**: short-duration price events, fixed-risk decisions, automatic expiry and settlement.
- **Polymarket**: YES / NO language, implied probability, event rules, and outcome-driven position thinking.
- **Hyperliquid**: dark trading UI, compact information density, responsive market surface, and professional trading mood.

The design adapts a futures layout into event judgment trading:

```text
Long / Short        -> YES / NO
Leverage           -> Fixed risk
Margin / Liquidation -> Max loss / potential payout
Orderbook          -> Probability / recent trades
Futures position   -> Event position
```

## Features

- Market list with mock event contracts
- Event detail pages with static routing
- YES / NO order panel with fixed-risk preview
- Mobile sticky trading actions
- Mock realtime price, probability, countdown, and trade feed updates
- Lightweight Charts candlestick surface with volume histogram
- Entry feedback on chart after mock order
- Local mock positions with status updates
- Event lifecycle: `OPEN` / `LOCKING` / `SETTLING` / `SETTLED`
- Automatic mock settlement with `WON` / `LOST` / `REFUNDED`
- Settlement result panel with final price, strike price, winning side, and explanation
- Payout and PnL breakdown for positions
- Dark, responsive trading UI optimized for web and H5 validation

## Tech Stack

- **Framework**: Next.js App Router
- **Language**: TypeScript
- **UI**: React
- **Styling**: Tailwind CSS
- **Charting**: lightweight-charts
- **Data**: local mock data
- **State**: local React state
- **Runtime boundary**: frontend only

No complex dependencies, backend services, websocket servers, wallets, or production exchange infrastructure are used.

## Product Philosophy

This project prioritizes product truth over infrastructure theater.

The current phase is focused on:

- trading feeling
- realtime feeling
- interaction quality
- mobile trading UX
- emotional clarity around countdown, position, and settlement

Engineering choices intentionally stay lightweight. The goal is to validate whether the event contract experience feels credible, understandable, and exciting before introducing production-level architecture.

If there is a tradeoff, the project prefers:

- stronger trading atmosphere over perfect abstraction
- clearer YES / NO decision making over feature breadth
- responsive mock feedback over real infrastructure
- maintainable-enough frontend structure over enterprise patterns

## Current Sprint Status

The prototype currently includes the first full local mock trading loop.

Completed:

- Event List homepage
- Event detail route
- Event card and market board structure
- Mock events, trades, candles, and realtime ticks
- Professional dark trading layout
- Responsive desktop and mobile trading surfaces
- YES / NO mock order flow
- Position preview and local position status
- Lightweight trading chart with volume
- Mock event expiry, settling, settlement, final payout, and PnL

Current phase:

```text
UX Stabilization & Trading Experience Validation
```

The product is ready for demo review around trading feeling, event comprehension, and the local mock order-to-settlement journey.

## Roadmap

Near-term:

- Improve demo narrative from market list to settlement result
- Polish mobile position readability
- Add clearer activity feed moments for mock order and settlement
- Improve empty, locked, settling, and settled states
- Tune countdown intensity and market movement feeling

Later:

- Add additional event categories beyond crypto price events
- Add watchlist or featured market grouping
- Add richer rule and settlement explanation patterns
- Add optional persisted local demo state
- Add visual QA pass across mobile breakpoints

Out of scope for this demo:

- real wallet connection
- real balances or funds
- real API integration
- real order matching
- backend services
- websocket infrastructure
- production settlement engine

## Local Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

Main routes:

```text
/                  Event List
/events/[eventId]  Event Detail
```

## AI Workflow

This project is developed through an AI-assisted sprint workflow.

Each sprint follows three review gates before continuing:

1. **Sprint Review**
   Review completed scope, modified files, current routes, component structure, and whether the implementation stayed aligned with product docs.

2. **Technical Self Check**
   Check component size, duplicated logic, hardcoded values, unclear types, responsive risks, state complexity, and whether mock implementations are clearly marked as mock.

3. **Product & UX Review**
   Compare the current demo against Binance Event Contract, Polymarket, and Hyperliquid. Focus on trading feeling, realtime energy, countdown intensity, YES / NO clarity, mobile UX, and emotional feedback.

Development guardrails:

- keep it frontend-only
- keep it mock-only
- avoid production architecture refactors
- avoid global providers unless clearly needed
- avoid service layers and complex state models
- prioritize trading feeling and UX validation

The AI workflow treats the prototype as both a product experiment and an implementation artifact: every feature should make the demo feel more like a real event contract trading product without pretending to be real trading infrastructure.
