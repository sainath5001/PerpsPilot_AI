# PerpPilot AI

AI-powered perpetual trading copilot for the **Injective Solo AI Builder Sprint**.

PerpPilot helps traders understand leverage risk, liquidation danger, funding exposure, and position management through practical AI guidance — built as a clean monorepo with independent frontend, backend, and smart contract layers.

## Monorepo Structure

```text
perppilot-ai/
├── frontend/     # Next.js trading terminal UI
├── backend/      # Express API + AI service layer
├── contracts/    # Foundry smart contracts (Sepolia)
├── README.md
└── .gitignore
```

## Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Zustand, RainbowKit, Wagmi, Viem, TradingView, Recharts |
| Backend | Node.js, Express, TypeScript, OpenAI (prepared) |
| Contracts | Foundry, Solidity, ERC20 on Sepolia |

## Prerequisites

- Node.js 20+
- npm
- Foundry (`curl -L https://foundry.paradigm.xyz | bash && foundryup`)

## Install Commands

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Runs at `http://localhost:3000`

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:4000`  
Health check: `GET http://localhost:4000/api/health`

### Contracts

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts --no-commit
cp .env.example .env
forge test
```

Deploy to Sepolia:

```bash
source .env
forge script script/DeployPerpPilotToken.s.sol:DeployPerpPilotToken \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast
```

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_CHAIN_ID` | Default chain ID (11155111 = Sepolia) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID |

### Backend (`backend/.env`)

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default 4000) |
| `CORS_ORIGIN` | Allowed frontend origin |
| `OPENAI_API_KEY` | OpenAI API key for AI features |

### Contracts (`contracts/.env`)

| Variable | Description |
| --- | --- |
| `PRIVATE_KEY` | Deployer private key |
| `SEPOLIA_RPC_URL` | Sepolia RPC endpoint |
| `ETHERSCAN_API_KEY` | Etherscan verification key |

## How The Layers Interact

```text
User Browser
    │
    ▼
frontend/  ── REST ──►  backend/  ── OpenAI API
    │                        │
    │  wallet + chain        │  optional onchain reads
    ▼                        ▼
RainbowKit/Wagmi/Viem    contracts/ (Sepolia ERC20)
```

1. **Frontend** renders the trading terminal, connects wallets via RainbowKit/Wagmi, and calls backend APIs for AI analysis.
2. **Backend** exposes modular routes/controllers/services, handles CORS, and will orchestrate OpenAI-powered trade analysis.
3. **Contracts** provide onchain utility (ERC20 scaffold) deployable to Sepolia; frontend reads chain state via Viem.

## Current Scope (Prompt 1)

This foundation includes:

- Production-ready folder structure
- Dark futuristic trading terminal design system
- shadcn/ui base components (`Button`, `Card`)
- Zustand store scaffold
- Web3 provider stack (Sepolia)
- Express health route + AI service placeholder
- Foundry ERC20 token + deploy script + tests

Not included yet (future prompts):

- Full dashboard pages
- AI trade analysis features
- Injective integration
- Production deployment

## License

MIT
