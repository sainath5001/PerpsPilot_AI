# PerpPilot AI

<p align="center">
  <strong>AI-powered perpetual trading risk copilot</strong><br />
  Built for the <a href="https://injective.com">Injective</a> Solo AI Builder Sprint
</p>

<p align="center">
  Describe your trade → get leverage, liquidation, and psychology insights — without executing on-chain perps.
</p>

---

## Screenshots

| Landing | Dashboard | AI Copilot |
|---------|-----------|------------|
| _Add screenshot: `/`_ | _Add screenshot: `/dashboard`_ | _Add screenshot: `/copilot`_ |

| Risk Analyzer | Faucet |
|---------------|--------|
| _Add screenshot: Risk Analyzer section_ | _Add screenshot: `/faucet`_ |

---

## Overview

**PerpPilot AI** is a full-stack demo that feels like an **AI Bloomberg Terminal for perpetual traders**. Users connect a wallet on Sepolia, mint simulation tokens (PPT), explore a trading dashboard, run a quantitative risk engine, and chat with an OpenAI-powered copilot.

**No exchange execution required** — analysis is driven by user-described positions + live market data.

---

## Features

- **Landing page** — premium crypto startup marketing site
- **Trading dashboard** — TradingView charts, GMX-style terminal UI
- **AI Copilot** — streaming OpenAI responses, markdown chat, risk-focused prompts
- **Risk analyzer** — leverage / liquidation / volatility / emotional scoring + Recharts
- **PPT faucet** — ERC20 faucet on Sepolia (Foundry + Wagmi)
- **Wallet** — RainbowKit (MetaMask, Rainbow, WalletConnect)

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 16)                    │
│  Landing · Dashboard · Copilot · Faucet · Risk UI            │
│  RainbowKit / Wagmi / Viem · Zustand · Recharts              │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST + SSE
┌──────────────────────────▼──────────────────────────────────┐
│                   Backend (Express + TS)                     │
│  /api/health · /api/ai/* · /api/risk/analyze                 │
│  OpenAI SDK · CoinGecko · Risk engine                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│              Contracts (Foundry / Sepolia)                     │
│  PerpPilotToken (PPT) — public faucet mint                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Zustand, RainbowKit, Wagmi, Viem, TradingView, Recharts |
| Backend | Node.js, Express, TypeScript, OpenAI SDK |
| Contracts | Foundry, Solidity, OpenZeppelin, Sepolia |
| Data | CoinGecko (prices), OpenAI (copilot + risk narrative) |

---

## Quick Start (Local)

### Prerequisites

- Node.js 20+
- npm
- Foundry (for contracts)
- OpenAI API key (for AI features)
- WalletConnect Project ID ([cloud.walletconnect.com](https://cloud.walletconnect.com))

### 1. Clone & install

```bash
git clone <your-repo-url>
cd PerpPilot_AI

cd frontend && npm install
cd ../backend && npm install
```

### 2. Environment variables

**Backend** — `backend/.env`:

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
```

**Frontend** — `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_PPT_TOKEN_ADDRESS=0x8aA49100DDfa3911518414fc6347bCBA9FA237AB
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

- App: http://localhost:3000  
- API health: http://localhost:4000/api/health  

---

## Smart Contract Deployment

See [contracts/README.md](./contracts/README.md).

```bash
cd contracts
source .env
forge script script/DeployPerpPilotToken.s.sol:DeployPerpPilotToken \
  --rpc-url $SEPOLIA_RPC_URL \
  --chain sepolia \
  --broadcast
```

Deploy PPT to Sepolia, then set `NEXT_PUBLIC_PPT_TOKEN_ADDRESS` in the frontend.

---

## AI System

| Endpoint | Purpose |
|----------|---------|
| `GET /api/ai/status` | Check OpenAI configuration |
| `POST /api/ai/chat` | Structured JSON risk response |
| `POST /api/ai/chat/stream` | SSE streaming markdown |

Prompts position the model as a **perpetual risk copilot** — not generic ChatGPT. The API key lives **only** on the backend.

---

## Risk Engine

`POST /api/risk/analyze` accepts:

- asset, leverage, position size, entry price, direction (long/short)

Returns composite risk score, liquidation estimate, chart data, and optional AI desk note. Market prices from **CoinGecko** with fallback defaults.

---

## Injective Integration

PerpPilot is submitted to the **Injective Solo AI Builder Sprint**. The current demo runs on **Sepolia (EVM)** for universal judge testing:

- Wallet + ERC20 faucet pattern maps to Injective EVM
- AI + risk layers are chain-agnostic
- README and landing page document Injective sprint alignment

Future: deploy PPT and frontend to Injective testnet, integrate Injective perp APIs for live positions.

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel (frontend) and Render/Railway (backend).

**Summary:**

1. Deploy backend → set `CORS_ORIGIN` to your Vercel URL  
2. Deploy frontend on Vercel → set `NEXT_PUBLIC_API_URL` to your API URL  
3. Add WalletConnect + PPT contract address env vars  

---

## Hackathon Submission

| Item | Link |
|------|------|
| GitHub | _your repo URL_ |
| Live demo | _Vercel URL_ |
| Demo video | _YouTube/Loom_ |
| Typeform | [Injective Sprint](https://xsxo494365r.typeform.com/to/uT6R8vhf) |

**How judges should test (5 min):**

1. Open landing page → **Launch Terminal**
2. Connect wallet (Sepolia) → **Faucet** → mint PPT
3. **Dashboard** → view charts and balances
4. **Risk Analyzer** → BTC 20x long → Run analysis
5. **AI Copilot** → ask “Analyze my BTC 20x long”

---

## Project Structure

```text
PerpPilot_AI/
├── frontend/          # Next.js app
├── backend/           # Express API
├── contracts/         # Foundry / PPT token
├── README.md
└── DEPLOYMENT.md
```

---

## License

MIT
