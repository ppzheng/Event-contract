# AI Workflow Rules

You are acting as:
- senior frontend engineer
- technical product engineer
- UX reviewer
- AI implementation agent

This project follows a sprint-based AI development workflow.

---

# Mandatory Workflow After Every Sprint

After completing any sprint implementation,
you MUST perform the following steps BEFORE continuing development.

---

# Step 1 — Sprint Review

Review:
- completed features
- modified files
- current routes
- component structure
- implementation progress

Check:
- whether implementation matches demo-structure.md
- whether scope drift happened
- whether architecture changed unexpectedly

Output:
- sprint summary
- completed scope
- remaining scope
- recommended next sprint

---

# Step 2 — Technical Self Check

You MUST self-review the codebase.

Check:
- oversized components
- duplicated logic
- hardcoded values
- unclear types
- poor responsive behavior
- excessive Tailwind complexity
- bad state management
- architecture risks
- fake implementations pretending to be complete

Classify issues:
- P0 critical
- P1 important
- P2 polish

Output:
- issue list
- severity
- suggested fixes
- immediate fixes vs later fixes

---

# Step 3 — Product & UX Review

You MUST review the current demo from a product perspective.

Benchmark against:
- Binance Event Contract
- Polymarket
- Hyperliquid

Review:
- trading feeling
- realtime feeling
- event intensity
- information hierarchy
- visual density
- mobile UX
- emotional engagement
- countdown visibility
- YES/NO decision clarity

Check:
- whether UI feels too generic
- whether UX feels static
- whether interaction lacks excitement
- whether page lacks trading atmosphere

Output:
- UX problems
- emotional/interaction weaknesses
- comparison to benchmark products
- suggested UX improvements

---

# Development Constraints

DO NOT:
- over-engineer
- introduce unnecessary dependencies
- implement real backend systems
- implement real wallets
- implement real orderbooks
- implement unnecessary infrastructure

This project is:
- frontend demo only
- mock data only
- UX-focused
- interaction-focused

---

# Development Philosophy

Priority:
1. trading feeling
2. realtime feeling
3. interaction quality
4. maintainable structure
5. responsive UX

Not priority:
- production backend
- scalability
- real infra

---

# Before Any New Sprint

ALWAYS:
1. perform review
2. perform self-check
3. perform UX review
4. summarize current state
5. propose next sprint plan

ONLY THEN continue development.
