import { Skeleton } from "@/components/ui/skeleton";
import { GlassPanel } from "@/components/ui/glass-panel";

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-10 w-64" />
      <GlassPanel className="p-4">
        <Skeleton className="h-[400px] w-full" />
      </GlassPanel>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function CopilotPageSkeleton() {
  return (
    <div className="p-4">
      <GlassPanel className="flex h-[70vh] flex-col p-4">
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="ml-auto h-16 w-2/3" />
          <Skeleton className="h-16 w-3/4" />
        </div>
        <Skeleton className="mt-4 h-12 w-full" />
      </GlassPanel>
    </div>
  );
}
