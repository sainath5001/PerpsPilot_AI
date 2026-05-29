import Link from "next/link";
import { Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold">{siteConfig.name}</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Built for the Injective Solo AI Builder Sprint. AI-powered perpetual
              trading risk intelligence.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-medium text-foreground">Product</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-primary">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/copilot" className="hover:text-primary">
                    AI Copilot
                  </Link>
                </li>
                <li>
                  <Link href="/faucet" className="hover:text-primary">
                    Faucet
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Resources</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="https://github.com"
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://injectivelabs.com"
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Injective
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PerpPilot AI. Demo software — not financial advice.
        </p>
      </div>
    </footer>
  );
}
