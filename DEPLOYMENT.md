# Deployment Guide

## Frontend — Vercel

1. Push repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Framework preset: **Next.js** (auto-detected)

### Environment variables (Vercel)

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `https://your-api.onrender.com/api` |
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | your WalletConnect ID |
| `NEXT_PUBLIC_PPT_TOKEN_ADDRESS` | `0x8aA4...` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

5. Deploy

---

## Backend — Render

1. New **Web Service** → connect repo
2. Root directory: `backend`
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Health check path: `/api/health`

Or use `backend/render.yaml` Blueprint.

### Environment variables (Render)

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `CORS_ORIGIN` | `https://your-app.vercel.app` |
| `OPENAI_API_KEY` | `sk-...` |
| `OPENAI_MODEL` | `gpt-4o-mini` |

---

## Backend — Railway

1. New project → deploy from repo
2. Set root to `backend/`
3. Uses `backend/railway.json` for build/start hints
4. Add same env vars as Render

---

## Production checklist

- [ ] Backend deployed and `/api/health` returns OK
- [ ] `CORS_ORIGIN` matches frontend URL exactly
- [ ] Frontend `NEXT_PUBLIC_API_URL` points to production API
- [ ] OpenAI key set on backend only
- [ ] WalletConnect project allows your production domain
- [ ] PPT contract deployed; address in frontend env
- [ ] Run `npm run build` locally before pushing

---

## Local production test

```bash
cd backend && npm run build && npm start
cd frontend && npm run build && npm start
```
