const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  ARB: "arbitrum",
  AVAX: "avalanche-2",
};

export interface MarketSnapshot {
  asset: string;
  coingeckoId: string;
  currentPrice: number;
  change24hPercent: number;
}

export function normalizeAsset(asset: string): string {
  return asset.trim().toUpperCase().replace(/USDT|USD|PERP/gi, "");
}

export async function fetchMarketSnapshot(asset: string): Promise<MarketSnapshot> {
  const normalized = normalizeAsset(asset);
  const id = COINGECKO_IDS[normalized];

  if (!id) {
    return fallbackSnapshot(normalized);
  }

  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("ids", id);
  url.searchParams.set("vs_currencies", "usd");
  url.searchParams.set("include_24hr_change", "true");

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    return fallbackSnapshot(normalized);
  }

  const data = (await res.json()) as Record<
    string,
    { usd?: number; usd_24h_change?: number }
  >;

  const row = data[id];
  if (!row?.usd) {
    return fallbackSnapshot(normalized);
  }

  return {
    asset: normalized,
    coingeckoId: id,
    currentPrice: row.usd,
    change24hPercent: row.usd_24h_change ?? 0,
  };
}

function fallbackSnapshot(asset: string): MarketSnapshot {
  const defaults: Record<string, { price: number; change: number }> = {
    BTC: { price: 67420, change: 2.4 },
    ETH: { price: 3512, change: -0.8 },
    SOL: { price: 178, change: 3.1 },
  };

  const d = defaults[asset] ?? { price: 100, change: 1.5 };

  return {
    asset,
    coingeckoId: "fallback",
    currentPrice: d.price,
    change24hPercent: d.change,
  };
}
