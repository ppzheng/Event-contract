# Event Contract Demo Page Restructure

## Goal

Transform the current professional contract trading page into an Event Contract Demo.

The current page is built around futures trading:

```text
Chart + Orderbook + Leverage Order Panel + Positions
```

The target Event Contract page should be built around event judgment:

```text
Event Question + Price Chart + YES/NO Probability + Fixed-Risk Order Panel + Event Positions
```

The demo should preserve the professional exchange feeling while making the user flow simpler and more beginner-friendly.

---

## Current Page Structure

From the reference screenshot, the current layout is:

```text
Top navigation
Market header
Left large chart
Middle orderbook and recent trades
Right futures order panel
Bottom positions and order history
```

Current trading concepts:

- Long / Short.
- Limit / Market.
- Leverage.
- Margin mode.
- Contract quantity.
- Liquidation price.
- Funding rate.
- Orderbook depth.
- Positions.

These are too complex for an Event Contract MVP.

---

## Target Demo Structure

Recommended Web layout:

```text
┌────────────────────────────────────────────────────────────┐
│ Top Navigation                                             │
├────────────────────────────────────────────────────────────┤
│ Event Header                                               │
├──────────────────────────────┬──────────────┬──────────────┤
│ Price Chart + Event Rules    │ Market Signal│ Order Panel  │
│                              │ + Activity   │              │
├──────────────────────────────┴──────────────┴──────────────┤
│ Event Positions / Settled History                          │
└────────────────────────────────────────────────────────────┘
```

Recommended H5 layout:

```text
Top Wallet Bar
Event Header
Price Chart
YES/NO Probability
Event Rules
Sticky YES/NO Action Bar
Bottom Sheet Order Form
Positions Tab
Settlement Page
```

---

## Core Conversion Map

| Current Futures Page | Event Contract Demo |
|---|---|
| Market pair / contract name | Event question |
| Current price | Current index price |
| Mark price | Strike price |
| Funding rate | Event countdown |
| Long / Short | YES / NO |
| Leverage | Fixed risk |
| Contract quantity | Premium amount |
| Margin | Max loss |
| Estimated liquidation price | Not needed |
| Orderbook | YES/NO probability and activity |
| Recent trades | Recent YES/NO trades |
| Position table | Event positions |
| PnL | Settlement PnL |
| Close position | Wait for settlement / view result |

---

## 1. Top Navigation

### Keep

- Brand logo.
- Main navigation.
- Wallet / recharge button.
- Help.
- Language.
- Notification.
- User account.

### Adjust

Add or highlight an Event Contract entry:

```text
Portfolio | Markets | Event Contract | Futures | Spot | Vault | More
```

### MVP

For demo, navigation can be static. No real routing is required except:

- Markets.
- Positions.
- Product / Research, optional.

---

## 2. Event Header

The current market header should become the main event information area.

### Current Header

```text
Trump 2028 election market
Current price
Index price
Mark price
24H change
Funding rate
Countdown
Delivery date
```

### Target Header

```text
Event title
Current index price
Strike price
Time left
YES probability
NO probability
Status
Volume
```

### Example

```text
Will BTC be above 68,000 USDT at 23:30?

Current: 68,120.5
Strike: 68,000.0
Time Left: 04:26
YES: 58%
NO: 42%
Status: Trading
```

### Fields

- `eventId`
- `eventTitle`
- `symbol`
- `currentPrice`
- `strikePrice`
- `expiryTime`
- `timeLeft`
- `yesProbability`
- `noProbability`
- `eventStatus`
- `volume`

### States

```text
TRADING
LOCKED
SETTLING
SETTLED
PAUSED
```

---

## 3. Left Area: Chart to Event Chart

The current chart area can be preserved visually but simplified conceptually.

### Keep

- Dark chart area.
- Price movement.
- Volume.
- Time controls.

### Replace / Add

- Add Strike Price horizontal line.
- Add event start marker.
- Add expiry marker.
- Add current result badge.
- Add user entry marker after mock order.

### Remove or Hide by Default

- Complex drawing tools.
- Too many indicators.
- Professional order placement overlay.
- Advanced chart controls.

### Event Chart Fields

- `currentPrice`
- `strikePrice`
- `candles`
- `volume`
- `expiryTime`
- `timeLeft`
- `currentWinningSide`

### Current Result Logic

```text
If currentPrice > strikePrice:
  YES is currently winning

If currentPrice < strikePrice:
  NO is currently winning

If currentPrice == strikePrice:
  Refund if settled now
```

### MVP Chart

MVP does not need a full TradingView clone.

Use:

```text
Mock line chart or simple candle chart
Strike line
Current price label
Countdown label
```

---

## 4. Middle Area: Orderbook to Probability Panel

The current orderbook is too professional for beginners. For Event Contract, it should become a probability and activity panel.

### Target Modules

```text
YES / NO Probability
Market Activity
Recent Trades
Optional Depth
```

### Probability Panel

Fields:

- `yesProbability`
- `noProbability`
- `yesPrice`
- `noPrice`
- `volume`
- `liquidity`

Example:

```text
YES 58%  |  Price 0.58
NO  42%  |  Price 0.42
```

Visual:

```text
YES ███████████ 58%
NO  ████████ 42%
```

### Recent Trades

Fields:

- Side: YES / NO.
- Amount.
- Price.
- Time.

Example:

```text
YES  25 USDT  0.58  23:24:10
NO   10 USDT  0.42  23:23:52
```

### MVP

Keep:

- Probability bar.
- Recent trades mock list.

Skip:

- Full depth ladder.
- Cumulative orderbook.
- Price-level aggregation.

---

## 5. Right Area: Futures Order Panel to Event Order Panel

This is the most important conversion.

### Current Futures Panel

```text
Cross / 10x
Limit / Market
Contract quantity
TP/SL
Reduce only
Buy Long / Sell Short
Margin
Liquidation price
Fee
```

### Target Event Panel

```text
Wallet balance
YES / NO selector
Amount input
Quick amount buttons
PnL preview
Risk reminder
Confirm button
```

### Order Panel Fields

- `availableBalance`
- `selectedSide`
- `amount`
- `entryPrice`
- `shares`
- `maxLoss`
- `potentialPayout`
- `netProfitIfWin`
- `roi`
- `expiryTime`
- `eventStatus`

### Example

```text
Available: 39.63 USDT

Will BTC be above 68,000 at 23:30?

[ YES 0.58 ] [ NO 0.42 ]

Amount
[ 10 USDT ]

You Pay: 10.00 USDT
Max Loss: 10.00 USDT
Potential Payout: 17.24 USDT
Net Profit If Correct: 7.24 USDT

[ Confirm YES ]
```

### Required States

```text
Can trade
Insufficient balance
Quote changed
Market locked
Market paused
Order pending
Order accepted
Order rejected
```

### Remove

- Leverage.
- Margin mode.
- Liquidation price.
- Stop loss / take profit.
- Reduce-only.
- Futures contract quantity.

---

## 6. Bottom Area: Positions to Event Positions

The current bottom table can stay, but the columns must change.

### Current Table

```text
Market
Contract quantity
Contract value
Entry price
Mark price
Unrealized PnL
TP/SL
Funding fee
Close
Reverse
```

### Target Event Positions

Tabs:

```text
Open Events
Settled
History
Funds
```

Open columns:

- Event.
- Side.
- Amount.
- Entry price.
- Potential payout.
- Strike price.
- Current price.
- Time left.
- Current status.
- Action.

Settled columns:

- Event.
- Side.
- Amount.
- Final price.
- Strike price.
- Result.
- Payout.
- Net PnL.
- Settlement time.

### Open Status

```text
Winning
Losing
Neutral
Locked
Settling
```

### Settled Status

```text
Won
Lost
Refunded
```

### MVP

Use cards on H5 and table on Web.

---

## 7. Settlement State

Settlement should be explicit, not hidden inside history.

### Settlement Page / Modal

Modules:

```text
Result status
Price comparison
Order summary
Payout breakdown
Next actions
```

Fields:

- `result`
- `side`
- `strikePrice`
- `finalPrice`
- `priceDifference`
- `amount`
- `payout`
- `pnl`
- `settlementTime`

Example:

```text
Result: Won

Your side: YES
Strike Price: 68,000.00
Final Price: 68,126.40

Paid: 10.00 USDT
Payout: 17.24 USDT
Net Profit: +7.24 USDT
```

---

## 8. Demo User Flow

### Primary Web Flow

```text
User opens Event Contract page
-> Reads event header
-> Watches price relative to strike line
-> Checks YES / NO probability
-> Selects YES in right panel
-> Enters amount
-> Reviews max loss and payout
-> Confirms order
-> Position appears at bottom
-> Countdown reaches expiry
-> Event enters settlement
-> Settlement result appears
```

### H5 Flow

```text
Markets
-> Event card
-> Event detail
-> Sticky YES / NO action
-> Bottom Sheet order
-> Confirm
-> Position card
-> Settlement result
```

---

## 9. Demo Data Model

### Event

```ts
type EventStatus = "TRADING" | "LOCKED" | "SETTLING" | "SETTLED" | "PAUSED";

interface EventMarket {
  id: string;
  title: string;
  symbol: "BTCUSDT" | "ETHUSDT";
  currentPrice: number;
  strikePrice: number;
  startTime: number;
  expiryTime: number;
  status: EventStatus;
  yesPrice: number;
  noPrice: number;
  yesProbability: number;
  noProbability: number;
  volume: number;
  liquidity: number;
}
```

### Position

```ts
type PositionStatus = "OPEN" | "SETTLING" | "WON" | "LOST" | "REFUNDED";
type EventSide = "YES" | "NO";

interface Position {
  id: string;
  eventId: string;
  side: EventSide;
  amount: number;
  entryPrice: number;
  shares: number;
  potentialPayout: number;
  strikePrice: number;
  openedAt: number;
  expiryTime: number;
  status: PositionStatus;
  finalPrice?: number;
  pnl?: number;
}
```

### Recent Trade

```ts
interface RecentTrade {
  id: string;
  eventId: string;
  side: "YES" | "NO";
  amount: number;
  price: number;
  timestamp: number;
}
```

---

## 10. Realtime Demo Behavior

Use frontend-only mock realtime.

### Mock Socket Loop

```text
Every 1 second:
- update current price
- update countdown
- update event status
- update position winning/losing state

Every 3 seconds:
- update YES / NO probabilities

Every 5 seconds:
- append recent trade

On expiry:
- lock event
- enter settling
- calculate final result
- update position
- update wallet
```

### Price Movement

```text
nextPrice = currentPrice + randomNoise + trendBias + nearExpiryVolatility
```

### Probability Movement

```text
If price above strike:
  YES probability increases

If price below strike:
  NO probability increases

Near expiry:
  leading side probability becomes more extreme
```

---

## 11. MVP Must Have

Must have:

- Event header.
- Current price.
- Strike price.
- Countdown.
- YES / NO selector.
- Amount input.
- Max loss.
- Potential payout.
- Mock order confirmation.
- Mock position.
- Mock realtime price.
- Event status lifecycle.
- Mock settlement.
- Result display.
- Web responsive layout.
- H5 responsive layout.

---

## 12. MVP Can Skip

Can skip:

- Real API.
- Real wallet.
- Login.
- Orderbook depth.
- Matching engine.
- Leverage.
- Liquidation.
- Stop loss.
- Take profit.
- Real KYC.
- Real settlement oracle.
- Vault.
- Copy trading.
- Comments.
- Leaderboard.
- Advanced chart tools.

---

## 13. Recommended Demo Page Copy

Use clear product language.

### Event Title

```text
Will BTC be above 68,000 USDT at 23:30?
```

### Rule Copy

```text
YES wins if the final BTCUSDT index price is greater than the strike price at expiry.
NO wins if the final price is lower than the strike price.
If the final price equals the strike price, your premium is refunded.
```

### Risk Copy

```text
Your maximum loss is the amount you pay for this position.
This is a mock demo and does not place real trades.
```

### Locked Copy

```text
Trading is locked near expiry. Settlement will start automatically.
```

---

## 14. Final Demo Shape

The target demo should look like a trading page, but behave like an event decision product.

Final structure:

```text
Top Navigation
Event Header
Left: Event Chart
Middle: Probability + Activity
Right: YES/NO Order Panel
Bottom: Event Positions
Settlement Modal/Page
```

Product principle:

```text
Keep the credibility of a trading terminal.
Remove the complexity of futures trading.
Make the user decision feel like fixed-risk event judgment.
```
