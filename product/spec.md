# Event Contract Spec

Project:
Event Contract Demo

Version:
MVP Demo Spec v1

Scope:
Frontend-only mock trading demo.

This spec defines:
- event lifecycle
- position lifecycle
- settlement rules
- YES/NO logic
- payout behavior
- UI state behavior

This is NOT production trading infrastructure.

---

# Product Definition

An Event Contract is a fixed-risk prediction-style trading product.

Users:
- choose YES or NO
- enter a fixed amount
- wait for settlement
- receive WON / LOST / REFUNDED result

The product is inspired by:
- Binance Event Contract
- Polymarket
- Hyperliquid

---

# Product Constraints

Current project scope:

- frontend only
- mock-only
- local state only
- no backend
- no websocket server
- no real wallet
- no real API
- no real matching engine

The purpose is:
- UX validation
- trading feeling validation
- interaction prototyping

---

# Event Lifecycle

Events follow this lifecycle:

OPEN
→ LOCKING
→ SETTLING
→ SETTLED

---

## OPEN

Event is tradable.

Allowed:
- open YES position
- open NO position

UI:
- active countdown
- realtime mock updates
- chart active
- order panel enabled

---

## LOCKING

Optional transitional state before expiry.

Trading may become disabled.

UI:
- warning state
- countdown urgency
- order actions disabled

Current MVP:
LOCKING may be skipped.

---

## SETTLING

Settlement in progress.

Rules:
- trading disabled
- positions frozen
- final result preparing

UI:
- SETTLING badge
- loading/pending feeling
- countdown replaced

Suggested duration:
2–5 seconds mock delay

---

## SETTLED

Final result generated.

Rules:
- positions finalized
- payout calculated
- event no longer tradable

UI:
- final result visible
- settlement panel visible
- WON / LOST / REFUNDED highlighted

---

# Event Types

Current MVP supports:

## Price-based Event

Example:
"Will BTC close above 68,500?"

Required:
- reference asset
- strike price
- current price

Settlement:
based on final price.

---

# YES / NO Logic

## YES Wins

YES wins if:

final price > strike price

---

## NO Wins

NO wins if:

final price <= strike price

---

# REFUNDED Logic

REFUNDED may occur if:
- settlement unavailable
- invalid result
- unsupported event type
- missing strike price

Refunded returns principal.

---

# Position Lifecycle

OPEN
→ WON / LOST / REFUNDED

---

## OPEN

Position is active.

Fields:
- side
- amount
- entry price
- payout estimate
- openedAt

UI:
- active position card
- realtime market relation
- potential payout

---

## WON

User prediction correct.

UI:
- positive highlight
- payout visible
- pnl visible

---

## LOST

User prediction incorrect.

UI:
- negative highlight
- pnl visible

---

## REFUNDED

User principal returned.

UI:
- neutral highlight
- refund explanation

---

# Order Rules

Current MVP:

Users:
- choose YES or NO
- input fixed amount
- confirm mock order

After confirmation:
- local mock position created
- chart entry line shown
- position card appears

No:
- balance deduction
- wallet interaction
- margin system
- leverage
- liquidation

---

# Pricing Model

Current pricing is mock-only.

Fields:
- yesPrice
- noPrice
- currentPrice

Prices:
- update locally
- use fake realtime ticks
- affect chart visualization only

No real market pricing exists.

---

# Chart Rules

Chart uses:
- lightweight-charts
- local mock candles
- fake realtime updates

Supported:
- candlestick series
- volume histogram
- strike line
- entry line
- latest price update

Not supported:
- real market data
- orderbook
- depth
- indicators
- advanced chart tools

---

# Countdown Rules

Countdown controls event lifecycle.

When countdown reaches zero:

OPEN
→ SETTLING

After short delay:

SETTLING
→ SETTLED

---

# Settlement Rules

Settlement occurs locally.

Settlement inputs:
- final price
- strike price
- position side

Settlement output:
- WON
- LOST
- REFUNDED

No backend validation exists.

---

# Payout Logic

## Winning Position

payout = amount × payoutMultiplier

Example:
10 USDT at 1.9 payout
→ 19 USDT returned

---

## Losing Position

payout = 0

---

## Refunded Position

payout = principal returned

---

# Current UI States

Supported UI states:

- OPEN
- SETTLING
- SETTLED
- WON
- LOST
- REFUNDED

Each state should:
- feel visually distinct
- feel emotionally clear
- communicate outcome immediately

---

# Mobile UX Rules

Mobile trading UX is critical.

Requirements:
- sticky trade actions
- easy YES/NO access
- readable chart
- visible position feedback
- fast interaction flow

Avoid:
- excessive scrolling
- hidden order actions
- dense unreadable panels

---

# UX Philosophy

Priority:
- trading feeling
- realtime feeling
- emotional engagement
- interaction clarity

Not priority:
- perfect architecture
- production infra
- scalability

---

# Technical Constraints

Avoid:
- service layer
- complex global state
- production abstractions
- backend simulation
- websocket infra

Prefer:
- local state
- lightweight logic
- direct UI feedback
- fast iteration

---

# Definition of Success

Success means:

A user can:

1. discover an event
2. choose YES or NO
3. place a mock order
4. watch market movement
5. track position state
6. experience settlement
7. clearly understand result

And feel:

"This feels like a real Event Contract trading experience."