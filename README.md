# KangTrader — Journey to Funded Trader

A personal trading journal and documentation platform built to track the real journey toward becoming a funded trader. Transparent, measurable, and realistic.

**Live:** [kang-trader.vercel.app](https://kang-trader.vercel.app)

---

## Overview

KangTrader is a full-stack web application that transforms raw trading data into a structured, publicly accessible documentation platform. It serves as both a personal accountability tool and a resource hub for traders looking to understand the prop firm ecosystem.

---

## Features

- **Live Trading Journal** — Real-time transaction logs with entry/exit data, win rate tracking, and account balance updates
- **Prop Firm Reviews** — Curated, honest reviews of proprietary trading firms based on direct experience
- **Trading Tools** — Utility tools to support daily trading decisions
- **Free Knowledge (Edukasi)** — Educational content on trading strategy, risk management, and consistency
- **Live Stats Dashboard** — Real-time balance, win rate, and account status pulled from external webhook data

---

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js | Framework & routing |
| Tailwind CSS | Styling |
| Supabase | Database & real-time data |
| REST API | External webhook data ingestion |

---

## Architecture

The front-end is built with a strict separation between presentation and data-fetching layers. A modular component system adapts to dynamic JSON data shapes from external webhooks, allowing the dashboard to render and filter thousands of metric rows without performance degradation.

```
External Webhook → REST API → Supabase → Next.js → UI
```

---

## Key Technical Decisions

- **Modular UI components** — adaptable to varied and dynamic data shapes from external sources
- **Decoupled data fetching** — presentation logic is fully separated from API calls for scalability
- **Real-time ingestion** — live balance and win rate stats update without manual refresh
- **CMS-style admin panel** — filterable and sortable metric tables for data management

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Randif444/trading-journal-web.git

# Install dependencies
cd trading-journal-web
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase URL, anon key, and any webhook secrets

# Run development server
npm run dev
```

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Author

**M. Randi Fathurrohman** — Front-End Developer
- Portfolio: [randi-f.vercel.app](https://randi-f.vercel.app)
- GitHub: [@Randif444](https://github.com/Randif444)
- LinkedIn: [randifathurrohman](https://www.linkedin.com/in/randifathurrohman/)
