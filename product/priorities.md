# Product Priorities

Project:
Event Contract Demo

Core Goal:
Build a highly convincing Event Contract trading demo
focused on:
- trading feeling
- realtime interaction
- emotional engagement
- UX validation

This is NOT a production exchange.

---

# Current Project Phase

Current phase:
UX Stabilization & Trading Experience Validation

The current goal is:
- making the demo feel real
- making interactions feel responsive
- improving trading atmosphere
- improving mobile trading UX

NOT:
- building production infrastructure
- building scalable backend systems
- building enterprise architecture

---

# P0 — Highest Priority

These define project success.

## Trading Feeling

The product must:
- feel like a real trading product
- feel active
- feel responsive
- feel emotionally engaging
- feel realtime

Focus:
- order interaction
- realtime visual updates
- trading atmosphere
- responsive feedback
- hover/click feeling
- information density
- market movement illusion

If forced to choose:
prefer better trading feeling over cleaner architecture.

---

## Mobile Trading UX

H5/mobile UX is critical.

The demo should:
- feel natural on mobile
- support thumb trading
- keep trading actions visible
- avoid clutter
- maintain strong readability

Focus:
- sticky action areas
- compact trading layout
- fast interaction
- responsive typography
- trading accessibility

---

## Realtime Feeling

The interface must feel alive.

Priority:
- fake realtime updates
- animated value changes
- active countdowns
- market movement simulation
- responsive order feedback

Not priority:
- real websocket infrastructure

---

## Interaction Quality

Every interaction should feel intentional.

Important:
- instant feedback
- smooth hover states
- responsive buttons
- clear order success state
- satisfying transitions
- active market atmosphere

Avoid:
- static dashboard feeling
- generic admin-panel feeling
- dead UI states

---

# P1 — Important

## Maintainable Frontend Structure

Code should remain:
- understandable
- modular enough
- reasonably reusable

But:
DO NOT over-engineer.

Avoid:
- enterprise abstractions
- excessive architecture layers
- unnecessary service layers
- production-level patterns

This is a demo-focused frontend project.

---

## Lightweight State Management

State should stay:
- simple
- understandable
- predictable

Avoid:
- unnecessary reducers
- complex providers
- over-abstracted stores
- fake scalability patterns

Use only what improves:
- UX
- realtime feeling
- maintainability

---

## Visual Polish

The UI should feel:
- premium
- modern
- trading-focused
- information-dense
- emotionally active

Benchmark products:
- Binance Event Contract
- Hyperliquid
- Polymarket

Priority:
- readability
- clarity
- responsiveness
- emotional tension

---

# P2 — Lower Priority

These are NOT important in the current phase.

## Production Infrastructure

Do NOT prioritize:
- backend scalability
- real matching engine
- real websocket servers
- real orderbook infrastructure
- authentication systems
- wallet integration
- production APIs
- security hardening

---

## Perfect Architecture

This project is:
- a frontend demo
- a UX prototype
- an interaction experiment

Not:
- enterprise software
- production exchange infra

Do not sacrifice UX speed for architecture purity.

---

# Product Philosophy

If forced to choose:

Prefer:
- better UX
- stronger trading feeling
- more realtime feeling
- better interaction quality

Over:
- cleaner abstractions
- perfect architecture
- unnecessary engineering

---

# AI Development Rules

Before implementing any feature:

Ask:

1. Does this improve trading feeling?
2. Does this improve realtime feeling?
3. Does this improve UX quality?
4. Is this necessary for the current demo?
5. Is this over-engineering?

If the answer is mostly "no":
do not prioritize it.

---

# Sprint Planning Rules

Every sprint should prioritize:

1. trading UX
2. interaction quality
3. mobile experience
4. realtime feedback
5. emotional engagement

Avoid:
- architecture-first development
- premature optimization
- infrastructure obsession

---

# Current Focus

Current priority list:

P0:
- event trading experience
- realtime market feeling
- mobile trading UX
- order interaction feedback
- countdown intensity
- position feedback clarity

P1:
- component cleanup
- lightweight state cleanup
- visual polish

P2:
- architecture refactor
- infra abstraction
- scalability concerns

---

# Definition of Success

Success means:

A user opens the demo and thinks:

"This actually feels like a real Event Contract trading product."

Not:

"This codebase has perfect architecture."

---

# Exception Rules

Normally:
avoid unnecessary dependencies.

However:

If a lightweight dependency significantly improves:
- trading feeling
- market realism
- realtime atmosphere
- professional trading UX

then it is allowed.

Current approved exception:

## lightweight-charts

Reason:
Trading charts are a core part of trading product credibility.

A realistic chart experience improves:
- professional feeling
- market immersion
- trading atmosphere
- realtime perception

Priority:
better trading realism
over artificial no-dependency purity.

Still avoid:
- heavy chart infrastructure
- production trading systems
- unnecessary backend complexity
