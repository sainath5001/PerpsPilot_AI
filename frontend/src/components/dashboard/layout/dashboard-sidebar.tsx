"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { SIDEBAR_ITEMS } from "@/lib/dashboard/constants";
import { useAppStore } from "@/store/use-app-store";
import type { DashboardSection } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const section = useAppStore((s) => s.dashboardSection);
  const setSection = useAppStore((s) => s.setDashboardSection);
  const mobileOpen = useAppStore((s) => s.mobileSidebarOpen);
  const setMobileOpen = useAppStore((s) => s.setMobileSidebarOpen);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  const content = (
    <>
      <div className="flex items-center justify-between border-b border-white/10 p-4 lg:hidden">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Navigation</p>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isLink = Boolean(item.href);
          const active = !isLink && section === item.id;

          if (isLink && item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id as DashboardSection)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "border border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_rgba(59,130,246,0.12)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={cn(!sidebarOpen && "lg:hidden")}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden border-t border-white/10 p-3 lg:block">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground"
        >
          {sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        </button>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close overlay"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-background/95 backdrop-blur-xl transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          !sidebarOpen && "lg:w-[72px]",
        )}
      >
        {content}
      </aside>
    </>
  );
}
