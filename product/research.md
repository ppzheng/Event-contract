# Event Contract Demo Research

## Product Goal

Build a frontend-only Event Contract Demo that lets users experience a simplified prediction-style trading flow without connecting to real trading infrastructure.

The demo should help users understand:

- What an event contract is.
- How YES / NO decisions work.
- How fixed-risk trading differs from leveraged futures.
- How price movement, countdown, probability, position status, and settlement interact.
- How a product inspired by Binance Event Contract and Polymarket could be structured for Web and H5.

Core product promise:

```text
Users can choose an event, buy YES or NO, see max loss and potential payout, wait for countdown, and receive an automatic mock settlement.
```

The product should feel like a credible trading interface, but it should be easier to understand than a professional futures page.

---

## Benchmark Products

### Binance Event Contract

Reference value:

- Simple price-direction event.
- Fixed premium / fixed potential payout.
- Automatic expiry and settlement.
- Platform-controlled quote and risk model.
- Strong beginner appeal because downside is capped.

Useful ideas for the demo:

- Short-duration contracts.
- Clear strike price.
- Clear expiry time.
- Explicit max loss.
- Automatic settlement.
- Trading page layout similar to exchange products.

### Polymarket

Reference value:

- YES / NO market language.
- Price implies probability.
- Event pages explain market rules.
- Users think in probability and outcome shares.
- Market activity and recent trades create social proof.

Useful ideas for the demo:

- YES / NO buttons.
- Probability display.
- Recent activity feed.
- Event rule section.
- Settlement explanation.
- Event card list similar to prediction markets.

### Apex / Professional Futures Layout

Reference value from the current screenshot:

- Top navigation.
- Market header.
- Large chart area.
- Middle orderbook / trade activity panel.
- Right-side order panel.
- Bottom position table.

Suggested adaptation:

```text
Professional futures page
-> Event judgment trading page
```

Replace:

```text
Buy Long / Sell Short -> Buy YES / Buy NO
Leverage -> Fixed Risk
Margin / Liquidation -> Max Loss / Potential Payout
Orderbook -> Probability / Recent Trades
Futures Position -> Event Position
```

---

## Binance Event Contract Analysis

Binance Event Contract can be understood as a centralized, platform-issued binary event contract.

The user selects a direction and pays a premium. If the event condition is true at expiry, the user receives a predetermined payout. If the condition is false, the user loses the premium. If the final price equals the strike price, the premium may be refunded depending on the rule.

Typical event:

```text
Will BTCUSDT Index Price be higher than 68,000 USDT at 23:30?
```

### Core Mechanics

- Underlying asset: BTCUSDT, ETHUSDT, etc.
- Event direction: Higher / Lower or YES / NO.
- Strike price: reference price at event creation.
- Expiry time: fixed settlement time.
- Premium: amount paid by user.
- Payout: amount received if user is correct.
- Max loss: premium paid.
- Settlement: automatic at expiry.

### Product Meaning

Binance Event Contract simplifies derivatives into a single decision:

```text
Will the price be above or below this level at expiry?
```

This removes many futures concepts:

- Leverage.
- Margin mode.
- Liquidation price.
- Funding rate.
- Stop loss.
- Orderbook complexity.

### Risk Control Implications

Because the platform is the quote provider or counterparty-like issuer, risk management is central.

Possible risk controls:

- Max order amount.
- Daily premium cap.
- Max open positions.
- Symbol-level exposure limits.
- Direction-level exposure limits.
- Pause trading under extreme volatility.
- Lock trading near expiry.
- Region / KYC restrictions.
- Quote adjustment based on platform exposure.

---

## Polymarket Analysis

Polymarket is a prediction market where users trade outcome shares.

In a typical YES / NO market:

- YES and NO represent mutually exclusive outcomes.
- Price is usually between 0 and 1.
- Price can be interpreted as implied probability.
- Winning shares redeem at 1.
- Losing shares redeem at 0.

Example:

```text
YES price = 0.58
User spends 10 USDT
Shares = 10 / 0.58 = 17.24
If YES wins, payout = 17.24
Net profit = 7.24
If YES loses, payout = 0
Net loss = 10
```

### Useful Product Lessons

- YES / NO is more intuitive than Call / Put for broad users.
- Probability display helps users understand market consensus.
- Market rules must be explicit and auditable.
- Recent trades and volume increase trust.
- Users should understand exactly what condition determines settlement.

### Difference From Binance Event Contract

| Dimension | Binance Event Contract | Polymarket |
|---|---|---|
| Core product | Platform-issued event contract | Prediction market |
| Counterparty | Platform / centralized issuer | Other market participants |
| Pricing | Platform quote and risk model | Market supply and demand |
| User language | Higher / Lower, fixed payout | YES / NO, probability shares |
| Common event type | Short-term price direction | Public events, politics, sports, crypto |
| Settlement | Automatic by platform index price | Market resolution rules / oracle-like process |
| Beginner fit | Very high | Medium |

For this demo, combine both:

```text
Binance-style fixed-risk trading + Polymarket-style YES/NO probability language
```

---

## User Psychology

Event Contract products are powerful because they compress trading into a simple question.

User internal logic:

```text
I understand the event.
I choose YES or NO.
I know how much I can lose.
I know what I can win.
I wait for the result.
```

### Positive Psychological Drivers

- Low cognitive load.
- Short feedback loop.
- Clear risk boundary.
- Sense of market judgment.
- Immediate emotional engagement.
- Easy first trade.

### Risky Psychological Drivers

- Short cycles can encourage over-trading.
- Binary outcomes can feel like gambling.
- Countdown can feel like an "opening draw" if over-designed.
- Fixed loss can make accumulated losses feel smaller than they are.
- Users may chase losses after repeated failed predictions.

### Design Principle

The product should make users feel:

```text
I am making a market judgment with fixed risk.
```

It should not make users feel:

```text
I should keep playing until I win.
```

Avoid:

- One-click doubling.
- Aggressive win animations.
- "Win back losses" prompts.
- Casino-style countdowns.
- Leaderboards focused on extreme gains.
- Overly short repeated rounds as the default.

Use:

- Max loss disclosure.
- Settlement explanation.
- Cumulative daily premium display.
- Cooling reminders after repeated losses.
- Educational language around market judgment.

---

## MVP Scope

The MVP should only implement a frontend mock trading loop.

### Required Flow

```text
Home page
-> Event detail page
-> Select YES / NO
-> Enter amount
-> Confirm mock order
-> Create mock position
-> Watch realtime price and countdown
-> Auto-settle at expiry
-> Show settlement result
```

### Required Pages

- Home / Markets.
- Event Detail.
- Order Modal or Order Sheet.
- Positions.
- Settlement Status.

### Required Features

- Mock event list.
- Mock current price.
- Mock strike price.
- Mock YES / NO probability.
- Amount input.
- PnL preview.
- Max loss display.
- Potential payout display.
- Mock position creation.
- Countdown.
- Mock realtime price updates.
- Automatic mock settlement.
- Web and H5 responsive layout.

### Recommended MVP Market Setup

- Symbols: BTCUSDT and ETHUSDT.
- Event duration: 5 minutes and 15 minutes.
- Event type: price above / below strike at expiry.
- Currency: mock USDT.
- Starting balance: mock wallet balance.
- Settlement rule: final price compared with strike price.

---

## Excluded Scope

Do not build these in the MVP:

- Real trading.
- Real wallet.
- Real user authentication.
- Real WebSocket.
- Real exchange API.
- Backend service.
- Database.
- Matching engine.
- Real orderbook.
- Real settlement oracle.
- KYC / compliance system.
- Vault execution.
- Copy trading execution.
- Comments.
- Ranking.
- Referral system.
- Complex chart indicators.
- Leverage.
- Liquidation.
- Stop loss / take profit.
- Advanced order types.

These can be simulated visually only if needed, but they should not block the MVP.

---

## UX Goals

### Primary UX Goals

- Make the event condition obvious.
- Make the user decision obvious.
- Make the risk obvious.
- Make settlement understandable.
- Make the product feel active through realtime updates.

### Web UX

Recommended Web structure:

```text
Top navigation
Event header
Left: price chart and event rules
Middle: YES / NO probability and recent trades
Right: fixed order panel
Bottom: open positions and settled history
```

Web should feel like a simplified trading terminal.

### H5 UX

Recommended H5 structure:

```text
Top wallet / event header
Event card or chart
YES / NO probability
Rules summary
Sticky bottom YES / NO action bar
Bottom Sheet order form
Positions as cards
Settlement as focused result page
```

H5 should feel like a quick decision app, not a dense trading terminal.

### UX Rules

- Always show countdown.
- Always show strike price.
- Always show max loss before confirmation.
- Always show potential payout before confirmation.
- Always show settlement basis after expiry.
- Use "Trading", "Locked", "Settling", "Settled" states clearly.
- Disable orders near expiry.

---

## Technical Direction

The demo should be frontend-only.

Recommended stack:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- Zustand for state management.
- lightweight-charts for mock chart.
- lucide-react for icons.
- setInterval-based mock realtime engine.

No backend is required.

### Core Frontend Systems

```text
Mock market data
Mock realtime price engine
Mock countdown engine
Mock order creation
Mock position store
Mock settlement engine
Mock wallet balance
Responsive Web / H5 layout
```

### State Stores

Suggested Zustand stores:

```text
marketStore
- events
- current prices
- candles
- recent trades
- update price
- update probabilities
- update event status

positionStore
- open positions
- settled positions
- order creation
- settlement logic

walletStore
- mock balance
- available balance
- realized pnl
- debit premium
- credit payout
```

---

## Page Structure

### 1. Home / Markets

Purpose:

```text
Help users discover active events and quickly choose YES / NO.
```

Modules:

- Header.
- Wallet balance summary.
- Market filters.
- Event list.
- Event cards.
- Open position shortcut.
- Risk reminder.

Event card fields:

- Event title.
- Symbol.
- Current price.
- Strike price.
- Expiry time.
- Time left.
- YES probability.
- NO probability.
- Volume.
- Status.
- YES / NO quick actions.

### 2. Event Detail

Purpose:

```text
Explain the event and support confident order placement.
```

Modules:

- Event header.
- Realtime price.
- Strike price.
- Countdown.
- Chart.
- Probability panel.
- Recent trades.
- Rules.
- Order panel.
- User positions for this event.

Fields:

- Event ID.
- Symbol.
- Current price.
- Strike price.
- Expiry time.
- Time left.
- YES price.
- NO price.
- YES probability.
- NO probability.
- Event status.

### 3. Order Modal / Sheet

Purpose:

```text
Let users place a mock order with full risk visibility.
```

Modules:

- Event summary.
- YES / NO selector.
- Amount input.
- Quick amount buttons.
- PnL preview.
- Risk reminder.
- Confirm button.

Fields:

- Selected side.
- Amount.
- Entry price.
- Shares or payout.
- Max loss.
- Potential payout.
- Net profit.
- Balance.

### 4. Positions

Purpose:

```text
Let users track active and settled event positions.
```

Modules:

- Position summary.
- Open positions.
- Settled positions.
- PnL history.

Fields:

- Position ID.
- Event title.
- Side.
- Amount.
- Entry price.
- Potential payout.
- Strike price.
- Current price.
- Time left.
- Status.
- PnL.

### 5. Settlement Status

Purpose:

```text
Explain final result and settlement accounting.
```

Modules:

- Result status.
- Price comparison.
- Order summary.
- Payout breakdown.
- Next action.

Fields:

- Result: Won / Lost / Refunded.
- User side.
- Strike price.
- Final price.
- Price difference.
- Premium paid.
- Payout.
- Net PnL.
- Settlement time.

---

## User Flow

### Primary MVP Flow

```text
User opens Markets
-> Sees BTC event
-> Opens Event Detail
-> Reviews strike price and countdown
-> Chooses YES
-> Enters 10 USDT
-> Reviews max loss and potential payout
-> Confirms mock order
-> Position is created
-> User watches price move
-> Event enters Locked near expiry
-> Event enters Settling at expiry
-> Mock settlement runs
-> User sees Won / Lost / Refunded
```

### Quick Trade Flow

```text
Markets
-> Click YES or NO on event card
-> Order Sheet opens
-> Enter amount
-> Confirm
-> Position created
```

### Position Review Flow

```text
Positions
-> Open position
-> Event Detail
-> Wait for expiry
-> Settlement Status
```

---

## Realtime Interaction Design

Realtime behavior should make the demo feel alive while remaining deterministic enough for testing.

### Mock WebSocket Design

Use a local mock engine:

```text
setInterval every 1 second
-> update current price
-> update candles
-> update countdown
-> update event status
-> update position status
-> settle expired events
```

Optional slower intervals:

```text
Every 3 seconds -> update YES / NO probabilities
Every 5 seconds -> add recent trade
Every 10 seconds -> create new candle
```

### Event Status Lifecycle

```text
TRADING
-> LOCKED
-> SETTLING
-> SETTLED
```

Rules:

- TRADING: user can place orders.
- LOCKED: final seconds before expiry, orders disabled.
- SETTLING: expiry reached, settlement running.
- SETTLED: result finalized.

### Position Status Lifecycle

```text
OPEN
-> WINNING / LOSING / NEUTRAL
-> SETTLING
-> WON / LOST / REFUNDED
```

### Price Simulation

Mock price should update each second.

Suggested model:

```text
nextPrice = currentPrice + randomNoise + trendBias + nearExpiryVolatility
```

Behavior:

- Random movement around current price.
- Slight trend shifts every 20 ticks.
- Higher volatility near expiry.
- Price should stay within realistic bounds.

### Probability Simulation

YES / NO probability should respond to current price and remaining time.

Simple logic:

```text
If current price > strike price:
  YES probability increases

If current price < strike price:
  NO probability increases

As expiry gets closer:
  leading side becomes more extreme
```

Formula concept:

```text
distance = currentPrice - strikePrice
timeFactor = 1 - timeLeft / totalDuration
yesProbability = clamp(50 + distanceImpact + timeImpact, 5, 95)
noProbability = 100 - yesProbability
```

### K-Line Mock

Use generated candles:

- Start with 80 candles.
- Update the latest candle every second.
- Create a new candle every 10 seconds.
- Synchronize candle close with current price.

Chart overlays:

- Current price line.
- Strike price line.
- Expiry marker.
- Optional user entry marker.

---

## Mock PnL Design

The demo can use a Polymarket-style price/share model because it is easy to understand visually.

### Order Calculation

```text
entryPrice = YES or NO price
amount = user premium
shares = amount / entryPrice
potentialPayout = shares * 1
maxLoss = amount
netProfitIfWin = potentialPayout - amount
```

Example:

```text
YES price = 0.58
Amount = 10 USDT
Shares = 17.24
Potential payout = 17.24 USDT
Net profit if win = 7.24 USDT
Max loss = 10 USDT
```

### Settlement Calculation

```text
If finalPrice > strikePrice:
  YES wins

If finalPrice < strikePrice:
  NO wins

If finalPrice == strikePrice:
  refund
```

For demo tolerance:

```text
If abs(finalPrice - strikePrice) < 0.01:
  REFUNDED
```

PnL:

```text
WON:
  payout = potentialPayout
  pnl = potentialPayout - amount

LOST:
  payout = 0
  pnl = -amount

REFUNDED:
  payout = amount
  pnl = 0
```

---

## Future Expansion

Future product directions after MVP:

### Market Expansion

- More symbols: SOL, BNB, XRP.
- More event durations: 1m, 5m, 15m, 1h.
- Themed event groups.
- Trending and Ending Soon filters.
- Watchlist.

### UX Expansion

- Better chart interactions.
- Settlement animation with restrained style.
- Event explanation cards.
- Risk usage dashboard.
- Daily premium tracking.
- Simulation mode.
- Guided first trade.

### Social / Growth Expansion

- Share result card.
- Strategy performance page.
- Educational missions.
- Creator-curated event lists.
- Non-monetary achievements.

### Trading Simulation Expansion

- More realistic quote changes.
- Market depth visualization.
- Slippage simulation.
- Fee simulation.
- Partial liquidity display.

### Responsible Design Expansion

- Loss streak reminders.
- Cooling-off state.
- Daily risk cap.
- User-defined max daily premium.
- Risk mode: Beginner / Standard.

---

## Vault Integration Ideas

Vault integration should not be part of MVP, but it is a strong future direction.

### Concept

A Vault is a strategy container that uses Event Contracts according to predefined rules.

Instead of users manually choosing every YES / NO event, users allocate mock funds into a strategy vault.

Example vaults:

- BTC Momentum Event Vault.
- ETH Mean Reversion Event Vault.
- High Volatility Breakout Vault.
- Low Frequency Conservative Event Vault.
- Demo Training Vault.

### Vault Product Model

Vault page should show:

- Strategy name.
- Strategy description.
- Supported symbols.
- Event duration.
- Max premium per event.
- Daily premium cap.
- Historical win rate.
- Average payout.
- Max drawdown.
- Current open event positions.
- Realized PnL.
- Risk level.

### Vault Risk Controls

Required controls:

- Max amount per event.
- Max daily premium usage.
- Max open positions.
- Loss streak pause.
- Volatility pause.
- User opt-out at any time.

### Copy Trading Ideas

Copy trading can be added as a lighter alternative to Vault.

Model:

```text
User follows a strategy profile.
Each copied order uses a fixed small premium.
User can set max daily premium.
System pauses after loss streak or daily cap.
```

Do not copy:

- Full balance.
- Dynamic martingale sizing.
- Unlimited consecutive trades.

### Product Warning

Vault and copy trading can increase retention, but they also increase user protection and compliance concerns.

Design principle:

```text
Vault should feel like controlled strategy simulation, not automated high-frequency betting.
```

---

## Project Context Summary

This project is a frontend-only Event Contract Demo.

It should:

- Use mock data.
- Use local realtime simulation.
- Support Web and H5.
- Combine Binance-style fixed-risk event contracts with Polymarket-style YES / NO probability display.
- Prioritize clarity, risk disclosure, countdown, mock positions, and settlement explanation.

It should not:

- Connect to real trading.
- Encourage gambling-like behavior.
- Hide risk.
- Overcomplicate the MVP with backend or matching engine logic.

The first successful version is a complete mock loop:

```text
Browse event -> choose YES/NO -> enter amount -> create mock position -> watch countdown -> auto-settle -> view result
```
